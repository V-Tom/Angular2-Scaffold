'use strict'
const webpack = require('webpack')
const helpers = require('./helpers')

/**
 * Webpack Plugins
 */
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin')
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin')
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin')
/**
 * Webpack Constants
 */

const METADATA = {
  title: 'NET ease Music',
  baseUrl: '/',
  isDevServer: helpers.isWebpackDevServer()
}

/**
 * Webpack Plugins
 */

const autoprefixer = require('autoprefixer')

module.exports = function (options) {
  const isProd = options.env === 'production'

  return {

    entry: {
      'polyfills': './src/polyfills.browser.ts',
      'reactive': './src/Reactive.ts',
      'main': './src/main.browser.ts'
    },

    resolve: {
      extensions: ['.ts', '.js', '.json', '.less', '.css'],
      modules: [helpers.root('src'), helpers.root('node_modules')],
    },

    /**
     * webpack 性能检测
     */
    performance: {
      hints: isProd ? "warning" : false
    },

    module: {

      rules: [
        {
          test: /\.ts$/,
          use: [
            'awesome-typescript-loader?{configFileName: "tsconfig.webpack.json"}',
            'angular2-template-loader'
          ],
          exclude: [/\.(spec|e2e)\.ts$/]
        },
        {
          test: /\.json$/,
          use: 'json-loader'
        },
        {
          test: /\.css$/,
          use: ['raw-loader', 'postcss-loader?sourceMap=inline']
        },
        {
          test: /\.less$/,
          exclude: /node_modules/,
          use: ['raw-loader', 'postcss-loader?sourceMap=inline', 'less-loader?sourceMap']
        },
        {
          test: /\.stylus$/,
          exclude: /node_modules/,
          use: ['raw-loader', 'postcss-loader?sourceMap=inline', 'stylus-loader?sourceMap']
        },
        {
          test: /\.html$/,
          use: 'raw-loader',
          exclude: [helpers.root('src/index.html')]
        },
        {
          test: /\.(jpg|png|gif)$/,
          use: 'file-loader'
        }
      ],

    },
    plugins: [
      new CheckerPlugin(),

      new LoaderOptionsPlugin({
        options: {
          postcss: function () {
            return [autoprefixer];
          }
        }
      }),

      new CommonsChunkPlugin({
        name: 'polyfills',
        chunks: ['polyfills']
      }),

      new CommonsChunkPlugin({
        name: 'reactive',
        chunks: ['reactive']
      }),

      new CommonsChunkPlugin({
        name: 'vendor',
        chunks: ['main'],
        minChunks: module => /node_modules\//.test(module.resource)
      }),

      new CommonsChunkPlugin({
        name: ['polyfills', 'reactive', 'vendor'].reverse()
      }),

      new HtmlWebpackPlugin({
        template: 'src/index.html',
        title: METADATA.title,
        chunksSortMode: 'dependency',
        metadata: METADATA,
        inject: 'head'
      }),

      new ScriptExtHtmlWebpackPlugin({
        defaultAttribute: 'defer'
      }),

      new ContextReplacementPlugin(
        /angular(\\|\/)core(\\|\/)src(\\|\/)linker/,
        helpers.root('src'), // location of your src
        {}
      ),

    ],

    node: {
      global: true,
      crypto: 'empty',
      process: true,
      module: false,
      clearImmediate: false,
      setImmediate: false
    }

  }
}
