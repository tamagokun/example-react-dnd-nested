var nib = require('nib')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var env = process.env.NODE_ENV || 'development'

var config = {
  path: __dirname + '/public',
  entry: [
    './app/index.js'
  ],
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(env)
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      hash: true,
      inject: 'body'
    })
  ],
  devtool: 'source-map'
}

if (env == 'development') {
  config.entry.unshift('webpack-hot-middleware/client')
  config.plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({"process.env": { NODE_ENV: JSON.stringify(env) }}),
    new HtmlWebpackPlugin({
      template: './index.html',
      hash: true,
      inject: 'body'
    })
  ]
  config.devtool = 'cheap-module-eval-source-map'
}

module.exports = {
  entry: config.entry,
  output: {
    path: config.path,
    filename: 'js/app.js',
    cssFilename: 'css/application.css',
    publicPath: '/',
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/},
      { test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader'},
      { test: /\.(otf|eot|svg|ttf|woff)/, loader: 'url-loader' },
      { test: /\.(jpg|png|gif|json)/, loader: 'url-loader' },
    ]
  },
  stylus: {
    'include css': true,
    use: [nib()],
  },
  resolve: {
    extensions: ['', '.js', '.json'],
  },
  plugins: config.plugins,
  devtool: config.devtool
}
