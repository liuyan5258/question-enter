var HtmlWebpackPlugin = require('html-webpack-plugin') 
var ExtractTextPlugin = require('extract-text-webpack-plugin') 
var path = require('path')
var webpack = require('webpack')
// 引入基本配置
var config = require('./webpack.config');

var SOURCE_MAP = true
config.devtool = SOURCE_MAP ? 'eval-source-map' : false

function generateExtractLoaders (loaders) {
  return loaders.map(function (loader) {
    return loader + '-loader' + (SOURCE_MAP ? '?sourceMap' : '')
  }).join('!')
}

config.vue = {
  loaders: {
    css: ExtractTextPlugin.extract('vue-style-loader', generateExtractLoaders(['css'])),
    less: ExtractTextPlugin.extract('vue-style-loader', generateExtractLoaders(['css', 'less'])),
    sass: ExtractTextPlugin.extract('vue-style-loader', generateExtractLoaders(['css', 'sass']))
  }
};

config.plugins = [
  // 公共模块
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendors',
    filename: 'vendors.js'
  }),
  // http://vuejs.github.io/vue-loader/workflow/production.html
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"'
    }
  }),
  // 压缩代码
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }), 
  new webpack.optimize.OccurenceOrderPlugin(),
  // 提取css为单文件
  new ExtractTextPlugin("css/[name].[contenthash].css"), 
  new HtmlWebpackPlugin({
    filename: '../index.html',
    template: path.resolve(__dirname, '../app/index.html'),
    inject: true
  })
];

module.exports = config;