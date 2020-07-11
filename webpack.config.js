/*! Webpack configuration */

import { resolve } from 'path'

import webpack from 'webpack'
import webpackNodeExternals from 'webpack-node-externals'
import TerserWebpackPlugin from 'terser-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'

import pkg from './package'

// Helpers
const resolvePath = (...args) => resolve(__dirname, ...args)

// Webpack config: Exporting a Function
const webpackConfig = (env = {}, argv) => {
  // Set `development` as Webpack default mode
  argv.mode = argv.mode || 'development'
  // Set `production` mode using `--mode=production`
  const PRODUCTION = argv.mode === 'production'
  // Enable debug mode using `--debug`
  const DEBUG = argv.debug || false

  return ({
    target: 'node',

    context: resolvePath('src'),
    entry: {
      index: './index.js'
    },

    output: {
      // This tells the server bundle to use Node-style exports
      libraryTarget: 'commonjs2',
      path: resolvePath('dist'),
      filename: '[name].js'
    },

    // Style of source mapping to enhance the debugging process
    devtool: PRODUCTION ? false : 'source-map',

    node: {
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
          enforce: 'pre',
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'eslint-loader',
          options: {
            // eslintPath: '', // `.eslintrc` is used by default
            emitError: true,
            emitWarning: !PRODUCTION,
            failOnError: PRODUCTION
          }
        },
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
      new CleanWebpackPlugin({
        verbose: DEBUG
      }),

      // Add dynamic banner to output bundle(s)
      PRODUCTION
        ? new webpack.BannerPlugin([
          new Date().toISOString().substr(0, 10),
          `@version ${pkg.version}`,
          `@author ${pkg.author}`
        ].join('\n'))
        : 0

    ].filter(Boolean),

    // Optimizations depending on the chosen mode
    optimization: {
      minimize: PRODUCTION,
      minimizer: [
        // JavaScript parser, mangler and compressor toolkit for ES6+
        new TerserWebpackPlugin({
          cache: true,
          parallel: true,
          extractComments: false,
          terserOptions: {
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
