import path from 'path';
import ejs from 'ejs';
import express from 'express';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import config from '../webpack.config';
import initialRender from './index';

const app = express();
const port = 3000;

app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

// Middleware
// ==========
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

// App Endpoint
// ============
app.get('*', initialRender);

app.listen(port, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info(`==> 🌎  Server listening on port ${port}.`);
  }
})
