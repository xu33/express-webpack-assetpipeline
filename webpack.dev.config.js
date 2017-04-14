// 开发环境的webpack配置
var webpack = require('webpack')
var path = require('path')

const outputPath = path.join(__dirname, 'release/js')

module.exports = function(env) {
  return {
    entry: {
      app: ''
    },
    output: {
      filename: '[name].js',
      path: outputPath,
      publicPath: '/assets',
      chunkFilename: '[id].chunk.js'
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
    }
  }
}()

/*
// express的app.js里面使用webpack-dev-middleware代码
if (process.env.NODE_ENV != 'production') {
  const webpackConfig = require('./webpack.dev.config')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpack = require('webpack')
  const compiler = webpack(webpackConfig)
  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath
  }))
}
*/