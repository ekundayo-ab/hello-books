const dotenv = require('dotenv');
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

dotenv.load();

module.exports = (env) => {
  const prodOptions = {
    devtool: 'source-map',
    devServer: {},
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        sourceMap: true,
        comments: false,
        compress: {
          warnings: false,
          drop_console: true
        },
      }),
    ]
  };

  const devOptions = {
    devtool: 'eval',
    devServer: {
      contentBase: path.resolve(__dirname, './client/public'),
      historyApiFallback: true,
      hot: true,
      inline: true,
      host: 'localhost', // Defaults to `localhost`
      port: 3000, // Defaults to 8080
      proxy: {
        '/api/v1/*': {
          target: 'http://localhost:8000/',
          secure: false,
          changeOrigin: true,
        },
      },
    },
    plugins: [new webpack.HotModuleReplacementPlugin()]
  };

  const configOptions = env === 'production' ? prodOptions : devOptions;
  configOptions.plugins.push(
    new webpack.EnvironmentPlugin([
      'API_KEY',
      'UPLOAD_PRESET'
    ]),
    new ExtractTextPlugin('bundle.css')
  );

  const CONFIG = {
    entry: [
      './client/src/index.jsx',
    ],
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, './client/dist'),
    },
    devtool: configOptions.devtool,
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    devServer: configOptions.devServer,
    module: {
      rules: [
        {
          test: /\.(scss|css)$/,
          exclude: /node_modules/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'sass-loader']
          }),
        },
        {
          test: /\.(png|jpg|gif|woff|woff2|eot|ttf|otf)$/,
          exclude: /node_modules/,
          use: [
            'file-loader',
          ],
        },
        {
          test: /\.(jsx|js)$/,
          include: [path.join(__dirname, 'client')],
          loader: 'babel-loader',
          exclude: /node_modules/,
          query: {
            cacheDirectory: true,
          },
        },
      ],
    },
    plugins: configOptions.plugins,
    node: {
      dns: 'empty',
      net: 'empty',
      fs: 'empty'
    }
  };
  return CONFIG;
};
