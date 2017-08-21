module.exports = {
  entry: [
    "./app/index.js"
  ],
  output: {
    filename: "./public/js/bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
}
