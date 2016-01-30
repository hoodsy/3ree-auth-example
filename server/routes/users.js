import * as service from '../api/users'

export function loginUser(req, res) {
  res.status(200)
  .json(filterUserProperties(req.user))
}

export function logoutUser(req, res) {
  req.logout()
  res.status(200).send('OK')
}

export function registerUser(req, res, next) {
  service.createUser(req.dbConn, req.body)
  .then(user => {
    if (user.err) next(user.err)
    // Begin user session
    // via Passport
    req.logIn(user, err => {
      if (err) next(err)
      res.status(200)
      .json(filterUserProperties(user))
    })
  })
  .error(err => {
    err.status = 500
    next(err)
  })
}

export function addDashboardToUser(req, res, next) {
  const {
    dashboardId,
    userId
  } = req.body
  service.addDashboardToUser(req.dbConn, dashboardId, userId)
  .then(results => {
    if (results.err) next(results.err)
    service.getUser(req.dbConn, userId)
    .then(user => {
      if (user.err) next(user.err)
      res.status(200)
      .json(filterUserProperties(user))
    })
  })
}

function filterUserProperties(user) {
  return {
    id: user.id,
    name: user.name || '',
    email: user.email,
    picture: user.picture || '',
    dashboards: user.dashboards,
    isAuthenticated: true
  }
}
