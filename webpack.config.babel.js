/*! Webpack configuration */

import { resolve } from 'path'

import webpack from 'webpack'
import webpackNodeExternals from 'webpack-node-externals'
import TerserWebpackPlugin from 'terser-webpack-plugin'
import EslintWebpackPlugin from 'eslint-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'

import pkg from './package'

// Helpers
const resolvePath = (...args) => resolve(__dirname, ...args)

// Webpack config: Exporting a Function
const webpackConfig = (env, argv) => {
  env = { ...env, ...process.env }
  // Set `development` as Webpack default mode
  env.APP_BUILD_MODE = argv.mode || env.APP_BUILD_MODE || 'development'

  return ({
    target: 'node',
    mode: env.APP_BUILD_MODE,

    context: resolvePath('src'),
    entry: {
      index: './index.js'
    },

    output: {
      // This tells the server bundle to use Node-style exports
      libraryTarget: 'commonjs2',
      path: resolvePath('dist'),
      filename: '[name].js',
      clean: true
    },

    // Style of source mapping to enhance the debugging process
    devtool: env.APP_BUILD_MODE === 'production' ? false : 'source-map',

    node: {
      global: false,
      // If you don't put this is, __dirname
      // and __filename return blank or /
      __dirname: false,
      __filename: false
    },

    externals: [
      // In order to ignore all modules in node_modules folder
      webpackNodeExternals()
    ],

    // Options for resolving module requests
    resolve: {
      extensions: [ '.js' ],
      alias: {
        '@': resolvePath('src')
      }
    },

    // Options affecting the normal modules
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        }
      ]
    },

    // Add plugins to the compiler
    plugins: [
      // Remove output folder(s) before building
      new CleanWebpackPlugin(),

      // Use eslint to find and fix problems in your JavaScript code
      new EslintWebpackPlugin(),

      // Add dynamic banner to output bundle(s)
      env.APP_BUILD_MODE === 'production'
        ? new webpack.BannerPlugin([
          new Date().toISOString().substr(0, 10),
          `@version ${pkg.version}`,
          `@author ${pkg.author}`
        ].join('\n'))
        : 0

    ].filter(Boolean),

    // Optimizations depending on the chosen mode
    optimization: {
      minimize: env.APP_BUILD_MODE === 'production',
      minimizer: [
        // JavaScript parser, mangler and compressor toolkit for ES6+
        new TerserWebpackPlugin({
          parallel: true,
          extractComments: false,
          terserOptions: {
            sourceMap: true,
            warnings: true,
            compress: true,
            mangle: true,
            ie8: false,
            safari10: false
          }
        })
      ]
    }
  })
}

module.exports = webpackConfig
