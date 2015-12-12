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
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      include: __dirname,
      loader: 'babel',
      query: {
        stage: 0,
        plugins: []
      }
    }]
  }
}

// enable React Hot loader
if (process.env.HOT) {
  config.module.loaders[0].query.plugins.push('react-transform');
  config.module.loaders[0].query.extra = {
    'react-transform': [{
      target: 'react-transform-hmr',
      imports: ['react'],
      locals: ['module']
    }]
  };
}

module.exports = config;
