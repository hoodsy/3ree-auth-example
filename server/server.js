import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import config from '../webpack.config'
import path from 'path'
import express from 'express'

const app = express();
const port = 3000;

import initialRender from './index'

// Middleware
// ==========
const compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

// App Endpoint
// ============
app.get('*', initialRender)
// app.get("*", function(req, res) {
//   res.sendFile(path.join(__dirname, '../app/', 'index.html'))
// })

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})
