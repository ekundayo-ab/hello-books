const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use:{
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/,
        use:{
          loader: 'html-loader'
        }
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    //compress: true,
    port: 9000
  }
};
