<!--
  Copyright 2018 Kenichi Ishibashi (Original Work)
  Modifications Copyright 2026 MeLi (Li Junjie)
  Licensed under the Apache License, Version 2.0 (the "License").
-->
# Kombu

> **Fork** by [MeLi (Li Junjie)](https://github.com/MeLi-55S).
> Original by [Kenichi Ishibashi (bashi)](https://github.com/bashi/kombu).
> Licensed under Apache 2.0.

A web app that converts a font from/to ttf, otf, woff and woff2.

https://kombu.kanejaku.org/

The whole process of conversion happens only on browsers. Once the app is loaded, no server interaction occurs.

This app uses WebAssembly and Web Workers. You need a modern browser to run this app. Major browsers like Firefox, Google Chrome, Safari and Edge support them.

## Build

You need [emscripten](https://emscripten.org/docs/getting_started) to build.

```sh
$ git clone --recursive https://github.com/MeLi-55S/kombu.git
# Install dependencies
$ yarn
# Build wasm for woff2 support
$ yarn make-wasm
# Build web app
$ yarn build
# optional: Launch http server for local development
$ http-server -p 4001 -c-0
```

The webapp will be generated under `public` directory. Copy `public` directory to your server.
