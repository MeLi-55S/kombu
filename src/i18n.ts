/*
 * Copyright 2026 MeLi (Li Junjie)
 *
 * Kombu — OpenType/WOFF/WOFF2 Converter
 * Fork: https://github.com/MeLi-55S/kombu
 * Original: https://github.com/bashi/kombu (Kenichi Ishibashi)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

export type Lang = 'zh' | 'en';

export interface I18nStrings {
  title: string;
  subtitle: string;
  dropzoneLabel: string;
  dropzoneHint: string;
  formatOtf: string;
  formatWoff: string;
  formatWoff2: string;
  convert: string;
  converting: string;
  convertHint: string;
  sizeComparison: string;
  processTime: string;
  download: string;
  reportIssue: string;
  forkBy: string;
  originalBy: string;
  license: string;
  detected: string;
  unsupported: string;
  noValidFonts: string;
  file: string;
  formatLabel: string;
  sourceFormat: string;
}

const zh: I18nStrings = {
  title: 'Kombu — 字体转换器',
  subtitle: '在 TTF / OTF / WOFF / WOFF2 之间互相转换字体，全程在浏览器本地完成，无需上传。',
  dropzoneLabel: '选择字体文件或将文件拖拽到这里',
  dropzoneHint: '支持 .ttf、.otf、.woff、.woff2 — 可一次选择多个文件',
  formatOtf: 'TTF / OTF',
  formatWoff: 'WOFF',
  formatWoff2: 'WOFF2',
  convert: '开始转换',
  converting: '正在转换',
  convertHint: '如果转换的字体文件较大，可能需要几分钟时间。',
  sizeComparison: '大小对比',
  processTime: '处理耗时',
  download: '下载',
  reportIssue: '反馈问题',
  forkBy: 'Fork 维护',
  originalBy: '原作',
  license: '基于 Apache 2.0 协议开源',
  detected: '已检测',
  unsupported: '不支持',
  noValidFonts: '没有可转换的有效字体文件',
  file: '文件',
  formatLabel: '格式',
  sourceFormat: '源格式',
};

const en: I18nStrings = {
  title: 'Kombu — Font Converter',
  subtitle: 'Convert fonts between TTF / OTF / WOFF / WOFF2 — all in your browser, no upload needed.',
  dropzoneLabel: 'Choose fonts or drop them here',
  dropzoneHint: 'Supports .ttf, .otf, .woff, .woff2 — multiple files allowed',
  formatOtf: 'TTF / OTF',
  formatWoff: 'WOFF',
  formatWoff2: 'WOFF2',
  convert: 'Convert',
  converting: 'Converting',
  convertHint: 'It may take several minutes when you convert a large font.',
  sizeComparison: 'Size comparison',
  processTime: 'Process time',
  download: 'Download',
  reportIssue: 'Report issue',
  forkBy: 'Fork by',
  originalBy: 'Original by',
  license: 'Licensed under Apache 2.0',
  detected: 'Detected',
  unsupported: 'Unsupported',
  noValidFonts: 'No valid font files to convert',
  file: 'File',
  formatLabel: 'Format',
  sourceFormat: 'Source format',
};

const strings: Record<Lang, I18nStrings> = { zh, en };

let currentLang: Lang = 'zh';

export function getLang(): Lang {
  return currentLang;
}

export function setLang(lang: Lang): void {
  currentLang = lang;
}

export function t<K extends keyof I18nStrings>(key: K): I18nStrings[K] {
  return strings[currentLang][key];
}
