import path from 'path';
import ejs from 'ejs';
import express from 'express';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import config from '../webpack.config';
import initialRender from './index';
import liveUpdates from '../config/liveUpdates';
import SocketIO from 'socket.io';

// Server Config
// =============
const app = express();
const port = 3000;

app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

// Server Middleware
// =================
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

// Client App Endpoint
// ===================
app.use(initialRender);

// Start Server
// ============
const server = app.listen(port, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info(`==> 🌎  Server listening on port ${port}.`);
  }
})
const io = SocketIO.listen(server);

liveUpdates(io);
