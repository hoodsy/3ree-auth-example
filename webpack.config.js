var path = require('path')
var webpack = require('webpack')

var config = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './client/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.IgnorePlugin(/vertx/), // Isomorphic fetch workaround
    new webpack.IgnorePlugin(/iconv.*/), // Isomorphic fetch workaround
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"development"',
        'global': {}, // WORKAROUND
    })
  ],
  module: {
    loaders: [
      { test: /\.json$/, loaders: ['json'], exclude: /node_modules/ },
      { test: /\.js$/,  loader: 'babel', exclude: /node_modules/ },
      { test: /\.js$/,  loader: 'eslint', exclude: /node_modules/ },
    ]
  },
  // build breaks on eslint without this workaround
  // https://github.com/MoOx/eslint-loader/issues/23
  eslint: {
    emitWarning: true
  },
}

module.exports = config;
