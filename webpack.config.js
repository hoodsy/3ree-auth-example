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
    new webpack.IgnorePlugin(/server\/index\.js$/),
    new webpack.DefinePlugin(
      {
        'process.env.NODE_ENV': '"development"',
        'global.GENTLY': false
      }
    ),
  ],
  module: {
    loaders: [
      { test: /\.json$/, loaders: ['json'], },
      { test: /\.js$/, exlude: /node_modules/, loaders: ['babel', 'eslint'], },
    ]
  },
  // build breaks on eslint without this workaround
  // https://github.com/MoOx/eslint-loader/issues/23
  eslint: {
    emitWarning: true
  },
  node: {
    __dirname: true,
  },
  // resolve: {
  //   alias: {
  //     'superagent': path.join(__dirname, 'node_modules/superagent/lib/client')
  //   }
  // }
}

module.exports = config;
