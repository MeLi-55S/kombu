<!--
  Copyright 2026 MeLi (Li Junjie)
  Licensed under the Apache License, Version 2.0 (the "License").
-->
# Kombu

一个纯浏览器端运行的字体格式转换工具，支持 TTF、OTF、WOFF、WOFF2 四种字体格式之间的互相转换。

在线使用：https://kombu.kanejaku.org/

## 特性

- **纯前端转换**：所有转换操作均在浏览器本地完成，字体文件不会上传到任何服务器，保障数据隐私和安全。
- **广泛格式支持**：支持 OpenType（TTF/OTF）、WOFF、WOFF2 三种字体格式的互相转换。
- **WebAssembly 加速**：WOFF2 压缩和解压通过 Emscripten 将 Google 的 WOFF2 C++ 库编译为 WebAssembly 实现，性能优异。
- **Web Workers 多线程**：转换任务在 Web Worker 中运行，不会阻塞主线程 UI，保证页面流畅响应。
- **PWA 离线支持**：通过 Service Worker 实现离线可用，首次加载后可在无网络环境下使用。
- **批量转换**：支持同时选择多个字体文件进行批量转换。
- **文件大小对比**：转换完成后展示源文件与目标文件的大小对比及压缩比率，让你直观了解转换效果。

## 浏览器兼容性

Kombu 使用了 WebAssembly、Web Workers 和 Service Worker 等现代 Web 技术，需要较新版本的浏览器才能正常运行。以下主流浏览器均支持：

- Mozilla Firefox
- Google Chrome
- Safari
- Microsoft Edge

## 格式转换支持矩阵

| 源格式 → 目标格式 | TTF/OTF | WOFF | WOFF2 |
|:---:|:---:|:---:|:---:|
| **TTF/OTF** | ✓ | ✓ | ✓ |
| **WOFF** | ✓ | ✓ | ✓ |
| **WOFF2** | ✓ | ✓ | ✓ |

## 技术架构

### 整体流程

```
用户选择字体 → 读取文件字节 → Web Worker 异步转换 → 自动下载结果
```

### 核心模块

| 模块 | 说明 |
|------|------|
| `src/format.ts` | 字体格式自动检测，通过文件头魔数（Magic Number）识别字体类型 |
| `src/sfnt.ts` | SFNT（Spline Font/Scalable Font）内部表示结构，作为转换的中间格式 |
| `src/otf.ts` | OpenType/TrueType 字体的解析器和构建器 |
| `src/woff.ts` | WOFF 字体的解析器和构建器 |
| `src/woff2.ts` | WOFF2 压缩/解压封装，调用 WebAssembly 模块完成底层操作 |
| `src/convert.ts` | 核心转换器，编排各种格式之间的转换逻辑 |
| `src/convertworker.ts` | Web Worker 通信管理层，负责任务分发和结果回传 |
| `src/worker.ts` | Worker 线程入口，加载 WASM 并处理转换请求 |
| `src/app.ts` | 主应用 UI，处理用户交互和结果展示 |
| `ffi.cc` | C++ 到 JavaScript 的外部函数接口（FFI），桥接 WOFF2 编解码算法 |
| `src/reader.ts` | 二进制数据读取器 |
| `src/writer.ts` | 二进制数据写入器 |

### 转换流程详解

1. **格式检测**：读取字体文件的前 4 个字节，根据魔数判断字体格式：
   - `0x4F54544F`（OTTO）或 `0x00010000`、`0x74727565`（true）→ OTF/TTF
   - `0x774F4646`（wOFF）→ WOFF
   - `0x774F4632`（wOF2）→ WOFF2

2. **中间表示**：如果需要转码（如 WOFF → TTF），先将源格式解析为 SFNT 内部结构，再构建为目标格式。

3. **WOFF2 处理**：WOFF2 的编解码利用 Emscripten 编译的 WebAssembly 模块，调用的底层库是 Google 官方的 [woff2](https://github.com/google/woff2) C++ 实现，包括 Brotli 压缩算法。

4. **结果输出**：转换完成后自动触发浏览器下载，文件名会自动加上对应的格式后缀（`.ttf`/`.otf`/`.woff`/`.woff2`）。

## 本地构建

### 前置依赖

- [Node.js](https://nodejs.org/) 及 [Yarn](https://yarnpkg.com/)
- [Emscripten](https://emscripten.org/docs/getting_started)（用于编译 WOFF2 的 WebAssembly 模块）

### 构建步骤

```sh
# 1. 克隆仓库（注意包含子模块，woff2 库为 git submodule）
git clone --recursive https://github.com/MeLi-55S/kombu.git
cd kombu

# 2. 安装 Node.js 依赖
yarn

# 3. 构建 WOFF2 WebAssembly 模块
yarn make-wasm

# 4. 构建 Web 应用
yarn build

# 5. （可选）启动本地 HTTP 服务器进行开发调试
npx http-server -p 4001 -c-0 public/
```

构建完成后，Web 应用将生成在 `public/` 目录下。将该目录部署到任意静态文件服务器即可使用。

### 构建产物说明

| 产物 | 说明 |
|------|------|
| `public/app.js` | 主应用 JavaScript 包 |
| `public/worker.js` | Web Worker JavaScript 包 |
| `public/ffi.wasm` | WOFF2 编解码 WebAssembly 模块 |
| `public/index.html` | 应用入口 HTML |
| `public/style.css` | 样式文件 |
| `public/service-worker.js` | PWA Service Worker（由 Workbox 生成） |

### NPM 脚本

| 命令 | 说明 |
|------|------|
| `yarn build` | 开发模式构建（webpack + HTML） |
| `yarn build:production` | 生产模式构建 |
| `yarn make-wasm` | 单独编译 WebAssembly 模块 |
| `yarn test` | 运行测试 |

## 项目依赖

### 核心依赖

- **TypeScript**：整个项目使用 TypeScript 编写，提供类型安全保障。
- **Webpack**：模块打包，分别输出主应用（`app.js`）和 Worker（`worker.js`）两个入口。
- **Emscripten**：将 Google WOFF2 C++ 库（含 Brotli 压缩）编译为 WebAssembly。
- **Workbox**：Google 的 Service Worker 库，用于生成离线缓存策略。

### 第三方库

- [zlibjs](https://github.com/imaya/zlib.js)：WOFF 格式解压时使用的 zlib 纯 JavaScript 实现。
- [woff2](https://github.com/google/woff2)：Google 官方的 WOFF2 编解码 C++ 库（通过 git submodule 引入）。
- [Brotli](https://github.com/google/brotli)：Google 的 Brotli 压缩算法库（woff2 的子模块）。

## 许可证

本项目基于 [Apache License 2.0](LICENSE) 开源。

- 原作作者：Kenichi Ishibashi
- 原作仓库：https://github.com/bashi/kombu
- **Fork 维护者：MeLi (Li Junjie)**
- **Fork 仓库：https://github.com/MeLi-55S/kombu**
