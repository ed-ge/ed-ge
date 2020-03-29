module.exports = {
  // 1
  entry: './src/engine/Main.js',
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js']
  },
  // 2
  output: {
    path: __dirname + '/webpack',
    publicPath: '/',
    filename: 'Main.js',
    libraryTarget: 'var',
    library: 'Main'
  },
  // 3
  devServer: {
    contentBase: './production'
  }
};