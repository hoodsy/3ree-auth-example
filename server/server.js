import path from 'path'
import ejs from 'ejs'
import express from 'express'
import session from 'express-session'
import bodyParser from 'body-parser'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import passport from 'passport'
// import SocketIO from 'socket.io'

import config from '../webpack.config'
import initialRender from './index'
import * as api from './api/http'
import { catchError,
         devErrorHandler,
         prodErrorHandler } from './config/errorHandler'
// import liveUpdates from '../config/liveUpdates'

// Server Config
// =============
const app = express()
const port = 3000

app.engine('html', ejs.renderFile)
app.set('view engine', 'html')
app.set('views', path.join(__dirname, 'views'))

// Server Middleware
// =================
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(config)
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
  app.use(webpackHotMiddleware(compiler))
}

app.use(session({
  secret: 'PUT_IN_ENV',
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

// Error Handler
// =============
app.use(catchError)
app.get('env') === 'development'
  ? app.use(devErrorHandler)
  : app.use(prodErrorHandler)

// API Endpoints
// =============
app.post('/api/list', api.addList)
app.post('/api/resource', api.addResource)
app.post('/api/dashboard', api.addDashboard)
// app.post('/login', users.postLogin)
// app.post('/signup', users.postSignUp)
// app.get('/logout', users.getLogout)

app.get('*', initialRender)

// Start Server
// ============
const server = app.listen(port, function (error) {
  if (error) {
    console.error(error)
  } else {
    console.info(`==> 🌎  Server listening on port ${port}.`)
  }
})

// const io = SocketIO.listen(server)
// liveUpdates(io)
