// 正式环境build的webpack配置
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ManifestPlugin = require('webpack-manifest-plugin')
var path = require('path')
var fs = require('fs')

const outputPath = path.join(__dirname, 'release/js')

module.exports = function(env) {
  return {
    entry: {
      app: ''
    },
    output: {
      filename: '[name].[hash].js',
      path: outputPath,
      publicPath: '/assets'
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: { "presets": ["es2015"] }
        }
      ]
    },
    externals: {
      jquery: 'jQuery',
      vue: 'Vue',
      highcharts: 'Highcharts',
      moment: 'moment'
    },
    plugins: [
      new HtmlWebpackPlugin(), // 生成引用所有资源的HTML文件，方便复制到模板中
      new ManifestPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        comments: false,
        compress: {
          warnings: false,
          drop_console: true
        }
      })
    ]
  }
}()