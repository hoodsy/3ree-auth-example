var path = require('path')
var webpack = require('webpack')

var config = {
  devtool: 'cheap-module-eval-source-map',
  target: 'node',
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
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"development"',
        'global': {}, // WORKAROUND
        'global.GENTLY': false // superagent client fix
    })
  ],
  module: {
    loaders: [
      { test: /\.json$/, loaders: ['json'], },
      { test: /\.js$/,  loader: 'babel', exclude: /node_modules/ },
      { test: /\.js$/,  loader: 'eslint', exclude: /node_modules/ },
    ]
  },
  // build breaks on eslint without this workaround
  // https://github.com/MoOx/eslint-loader/issues/23
  eslint: {
    emitWarning: true
  },
  node: {
    __dirname: true, // superagent client fix
  },
}

module.exports = config;
