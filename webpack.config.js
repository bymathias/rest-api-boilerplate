/*! Webpack configuration */

import { resolve } from 'path'

import webpack from 'webpack'
import TerserWebpackPlugin from 'terser-webpack-plugin'
import webpackNodeExternals from 'webpack-node-externals'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'

// Helpers
const resolvePath = (...args) => resolve(__dirname, ...args)

// Webpack config: Exporting a Function
const webpackConfig = (env = {}, argv) => {
  // Set environment object
  env = { ...env, ...process.env }
  // Set `development` as Webpack default mode
  argv.mode = argv.mode || 'development'
  // Set `production` mode using `--mode=production`
  env.PRODUCTION = argv.mode === 'production'
  // Enable debug mode using `--debug`
  env.DEBUG = argv.debug || false

  // Dynamic banner template
  const banner = [
    new Date().toISOString().substr(0, 10),
    env.npm_package_name,
    `@version ${env.npm_package_version}`,
    `@license ${env.npm_package_license}`,
    `@author  ${env.npm_package_author_name}`,
    'Copyright (c) 2020'
  ].join('\n')

  return ({
    target: 'node',
    name: 'api',

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
    devtool: '#source-map',

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
            emitWarning: !env.PRODUCTION,
            failOnError: env.PRODUCTION
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
        verbose: env.DEBUG
      }),

      // Add dynamic banner to output bundle(s)
      env.PRODUCTION
        ? new webpack.BannerPlugin(banner)
        : 0

    ].filter(Boolean),

    // Optimizations depending on the chosen mode
    optimization: {
      minimize: env.PRODUCTION,
      minimizer: [
        // JavaScript parser, mangler and compressor toolkit for ES6+
        new TerserWebpackPlugin({
          sourceMap: true,
          cache: true,
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
