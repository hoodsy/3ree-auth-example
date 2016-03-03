import * as service from '../api/users'

export function getUser(req, res, next) {
  const { userId } = req.params
  service.getUser(req.dbConn, userId)
  .then(user => {
    if (user.err) next(user.err)
    res.status(200)
    .json(filterUserProperties(user))
  })
  .error(next)
}

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
  .error(next)
}

export function addOrganizationToUser(req, res, next) {
  const {
    organizationId,
    userId
  } = req.body
  service.addOrganizationToUser(req.dbConn, organizationId, userId)
  .then(results => {
    if (results.err) next(results.err)
    service.getUser(req.dbConn, userId)
    .then(user => {
      if (user.err) next(user.err)
      res.status(200)
      .json(filterUserProperties(user))
    })
    .error(next)
  })
  .error(next)
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
    .error(next)
  })
  .error(next)
}

export function removeDashboardFromUser(req, res, next) {
  const {
    dashboardId,
    userId
  } = req.body
  service.removeDashboardFromUser(req.dbConn, dashboardId, userId)
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
    name: user.name || {},
    email: user.email,
    picture: user.picture || '',
    organizationId: user.organizationId || ''
  }
}
