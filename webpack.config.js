const path = require('path')


module.exports = {
    mode: process.env.NODE_ENV,
    entry: path.resolve(__dirname, './client/index.js'),
    output : {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'build'),
      publicPath: '/build'
    },
    resolve: {
      extensions: ['.js', '.jsx'],

    },
    module : {
      rules : [
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader',
            },]
        },
        {
          test : /\.jsx?/,
          exclude: /node_modules/,
          use : {
            loader: 'babel-loader',
            options: {
              presets : ['@babel/preset-env', '@babel/preset-react'],
            }
          }
        },

        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader', 'sass-loader' ]
      }
      ]
    },
    devServer: {
      
       publicPath: '/build',
       proxy: {
           '/': 'http://localhost:3000',
           '/location': 'http://localhost:3000'

       },
      hot: true,
      port: 8080,
  },
};

