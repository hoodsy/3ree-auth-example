import { Router } from 'express'

import initialRender from '../index'
import { requireAuthenticated } from '../middleware/auth'
import { catchError,
         devErrorHandler,
         prodErrorHandler } from '../middleware/errorHandlers'
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
  router.all('/api/*', requireAuthenticated)
  app.get('env') === 'development'
    ? router.get('/', initialRender)
    : router.get('/', requireAuthenticated, initialRender)

  // Dashboards
  // ==========
  router.route('/api/dashboard')
  .post(dashboards.createDashboard)
  .delete(dashboards.deleteDashboard)

  router.route('/api/dashboard/add/user')
  .post(dashboards.addUserToDashboard)

  // Lists
  // =====
  router.route('/api/list')
  .post(lists.createList)

  // Resources
  // =========
  router.route('/api/resource')
  .post(resources.createResource)

  // Users
  // =====
  router.post('/api/user/dashboard/add', users.addDashboardToUser)
  router.post('/api/user/dashboard/remove', users.removeDashboardFromUser)

  // Auth
  // ====
  // Local
  // -----
  router.post('/auth/login', passport.authenticate('local'), users.loginUser)
  router.get('/auth/logout', users.logoutUser)
  router.post('/auth/register', users.registerUser)
  // Facebook
  // --------
  router.get('/auth/facebook', passport.authenticate('facebook'))
  router.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login'
  }))
  // Google
  // ------
  router.get('/auth/google', passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ]
  }))
  router.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login'
  }))

  // Root / Error Handler
  // ====================
  router.get('*', initialRender)
  router.use(catchError)
  app.get('env') === 'development'
    ? router.use(devErrorHandler)
    : router.use(prodErrorHandler)
  app.use(router)
}
