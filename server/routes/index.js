import { Router } from 'express'

import initialRender from '../index'
import { requireAuthenticated } from '../middleware/auth'
import * as dashboards from './dashboards'
import * as lists from './lists'
import * as resources from './resources'
import * as users from './users'

export default (app, passport) => {

  // Init
  // ====
  const router = Router()

  // Auth Middleware
  // ===============
  if (app.get('env') !== 'development') {
    router.all('/api/*', requireAuthenticated)
    router.get('/', requireAuthenticated, initialRender)
  } else {
    router.get('/', initialRender)
  }

  // Dashboards
  // ==========
  router.route('/api/dashboard')
  .post(dashboards.addDashboard)

  // Lists
  // =====
  router.route('/api/list')
  .post(lists.addList)

  // Resources
  // =========
  router.route('/api/resource')
  .post(resources.addResource)

  // Users
  // =====
  router.post('/user/login', passport.authenticate('local'), users.loginUser)
  router.get('/user/logout', users.logoutUser)
  router.post('/user/register', users.registerUser)
  router.get('/auth/facebook', passport.authenticate('facebook'), (req, res) => {})
  router.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login'
  }))
  router.get('/auth/google', passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ]
  }))
  // router.get('/auth/google/*', (req, res) => {console.log(res);})
  router.get('/auth/google/*', passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login'
  }))


  router.get('*', initialRender)
  app.use(router)
}
