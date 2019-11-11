const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  entry: './serato-firewall-header.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'serato-firewall-header.bundle.js',
    library: 'Serato',
    libraryTarget: 'var'
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ],
  },
  devServer: {
    contentBase: './dist'
  }
}