module.exports = {
  // 1
  entry: './src/engine/Base.js',
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
    filename: 'Base.js',
    libraryTarget: 'var',
    library: 'Base'
  },
  // 3
  devServer: {
    contentBase: './production'
  }
};