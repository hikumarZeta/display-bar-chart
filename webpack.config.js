const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const path = require('path')
const SOURCE_PATH = path.resolve(__dirname,'src/ui')
const SOURCE_JS_PATH = path.resolve(SOURCE_PATH, 'scripts')
const OUTPUT_PATH = path.resolve(__dirname, 'dist')
const MAIN_SCRIPT_FILE = 'index.js'
const MAIN_HTML_FILE = 'index.html'
const OUTPUT_FILE = 'bundle.js'
module.exports ={
  entry: path.resolve(SOURCE_JS_PATH,MAIN_SCRIPT_FILE),
  output: {
    path: OUTPUT_PATH,
    filename: OUTPUT_FILE,
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: [ 'style-loader', 'css-loader' ],
    }]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(SOURCE_PATH, MAIN_HTML_FILE)
    })
  ],
  devServer: {
  contentBase: OUTPUT_PATH,
  compress: true,
  port: 9000
}
}
