import { Router } from 'express'

import initialRender from '../index'
import { isAuthenticated } from '../middleware/auth'
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
    router.all('/api/*', isAuthenticated)
    router.get('/', isAuthenticated, initialRender)
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

  router.get('*', initialRender)
  app.use(router)
}
