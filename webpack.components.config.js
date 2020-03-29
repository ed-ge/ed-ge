module.exports = {
  // 1
  entry: './src/engine/Components.js',
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
    filename: 'Components.js',
    libraryTarget: 'var',
    library: 'Components'
  },
  // 3
  devServer: {
    contentBase: './production'
  }
};