const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
      app: './src/pages/login/main.js'
    },
    devtool: 'inline-source-map',
    devServer: {
      contentBase: path.resolve(__dirname, 'server'),
      host: '127.0.0.1',
      compress: true,//服务器压缩
      port: 6600
    },
    plugins: [
      //new CleanWebpackPlugin(['server']),
      new HtmlWebpackPlugin({
        title: 'Development'
      })
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'server')
    },
    resolve: {
      extensions: ['.js', '.vue']
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            // vue-loader options go here
          }
        },
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          loaders: [
            require.resolve('babel-loader'), // .babelrc 具体配置文件
            //'eslint-loader'// 必须在 .babelrc 的后面
          ]
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        }
      ]
    }
};

