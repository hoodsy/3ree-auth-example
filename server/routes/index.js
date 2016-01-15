import initialRender from '../index'
import { isAuthenticated } from '../middleware/auth'
import * as dashboards from './dashboards'
import * as lists from './lists'
import * as resources from './resources'
import * as users from './users'

export default (app, passport) => {

  // Dashboards
  // ==========
  app.post('/api/dashboard', dashboards.addDashboard)

  // Lists
  // =====
  app.post('/api/list', lists.addList)

  // Resources
  // =========
  app.post('/api/resource', resources.addResource)

  // Users
  // =====
  app.post('/user/login', passport.authenticate('local'), users.loginUser)
  app.get('/user/logout', users.logoutUser)
  app.post('/user/register', users.registerUser)

  // Middleware / Root
  // =================
  app.all('/api/*', isAuthenticated)
  app.get('/', isAuthenticated, initialRender)
  app.get('*', initialRender)

}
