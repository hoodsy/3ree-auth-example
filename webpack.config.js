var path = require('path')
var webpack = require('webpack')

var config = {
  devtool: 'eval-cheap-module-source-map',
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&reload=true',
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
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: [
          path.join(__dirname, 'client'),
          path.join(__dirname, 'common'),
          path.join(__dirname, 'server')
        ],
        query: {
          cacheDirectory: true,
        },
        plugins: [
          ["transform-react-display-name"],
          ['react-transform', {
            transforms: [
              {
                transform: 'react-transform-hmr',
                imports: ['react'],
                locals: ['module'],
              },
              {
                transform: 'react-transform-catch-errors',
                imports: ['react', 'redbox-react'],
              },
            ],
          }],
        ],
      },
      {
        test: /\.js$/,
        loader: 'eslint',
        include: [
          path.join(__dirname, 'client'),
          path.join(__dirname, 'common'),
          path.join(__dirname, 'server')
        ]
      },
    ]
  },
  // build breaks on eslint without this workaround
  // https://github.com/MoOx/eslint-loader/issues/23
  eslint: {
    emitWarning: true
  },
}

module.exports = config;
