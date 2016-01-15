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
import passportConfig from './config/passport'
import routesConfig from './routes'
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
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 8640000 // 24hrs in ms
  }
}))
app.use(passport.initialize())
app.use(passport.session())
passportConfig(passport)

// API Endpoints
// =============
routesConfig(app, passport)

// Start Server
// ============
const server = app.listen(port, function (error) {
  if (error) {
    console.error(error) // eslint-disable-line no-console
  } else {
    console.info(`==> 🌎  Server listening on port ${port}.`) // eslint-disable-line no-console
  }
})

// const io = SocketIO.listen(server)
// liveUpdates(io)

// Error Handler
// =============
app.use(catchError)
app.get('env') === 'development'
  ? app.use(devErrorHandler)
  : app.use(prodErrorHandler)
