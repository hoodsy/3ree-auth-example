import express from 'express'
import session from 'express-session'
import { Server } from 'http'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import passport from 'passport'
import socketIo from 'socket.io'

import config from '../webpack.config'
import passportConfig from './config/passport'
import routesConfig from './routes'
import { closeDbConnection,
         createDbConnection } from './middleware/dbConnection'

// Server Config
// =============
const app = express()
const server = Server(app)
const port = 3000
export const io = socketIo(server)

// Server Middleware
// =================
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(createDbConnection)

if (app.get('env') === 'development') {
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

// Routes Config
// =============
routesConfig(app, passport)

// Start Server
// ============
server.listen(port, (error) => {
  if (error)
    console.error(error) // eslint-disable-line no-console
  else {
    console.info('----------') // eslint-disable-line no-console
    console.info(`Server listening on port ${port}.`) // eslint-disable-line no-console
    console.info('==========') // eslint-disable-line no-console
  }
})

// Close Connection
// ================
app.use(closeDbConnection)
