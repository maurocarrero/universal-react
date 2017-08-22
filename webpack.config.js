const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: [
    "./app/index.js"
  ],
  output: {
    path: path.join(__dirname, "/public"),
    filename: "/js/bundle.js",
    chunkFilename: "/js/[chunkhash].chunk.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['public'])
  ]
}
