/**
 * Copyright 2018 Kenichi Ishibashi (Original Work)
 * Modifications Copyright 2026 MeLi (Li Junjie)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Modified by MeLi (Li Junjie) from the original version:
 *   - Updated Webpack 4 to 5 (experiments.asyncWebAssembly, node.fs → fallback)
 *   - Added NormalModuleReplacementPlugin for node: prefix
 *   - Changed workbox handler from 'networkOnly' to 'NetworkOnly'
 *   - Added .tsx, .jsx to resolve.extensions
 */

const path = require('path');
const webpack = require('webpack');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    app: './src/app.ts',
    worker: './src/worker.ts'
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.ts', '.js','.tsx','.jsx'],
    fallback: {
      fs: false,
      path: false,
      buffer: require.resolve('buffer/'),
    },
  },
  module: {
    rules: [{ test: /\.ts$/, loader: 'ts-loader' }]
  },
  plugins: [
    new webpack.NormalModuleReplacementPlugin(/^node:/, (resource) => {
      resource.request = resource.request.replace(/^node:/, '');
    }),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
    new WorkboxPlugin.GenerateSW({
      swDest: path.resolve(__dirname, 'public/service-worker.js'),
      runtimeCaching: [
        {
          urlPattern: /\.(?:wasm|js|html|css)$/,
          handler: 'NetworkOnly'
        }
      ]
    })
  ],
  experiments: {
  	asyncWebAssembly: true,
  },
};
