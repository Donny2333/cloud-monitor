var path = require('path')

module.exports = {
  entry: './src/js/app.js', //项目入口文件
  output: {
    path: './dist/public',
    publicPath: './public/',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js'],
    alias: {
      src: path.resolve(__dirname, '../source')
    }
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules|lib/,
        loader: 'babel-loader?stage=0',
        query: { compact: false }
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: 'raw-loader?stage=0'
      }
    ]
  }
}
