import passport from 'passport'

import * as service from './service'

// Resources
// =====
export function addResource(req, res) {
  service.addResource(req.body)
  .then((resource) => res.json(resource))
  .error(err => {
    res.status(400)
    res.json({ error: err, resource: req.body })
  })
}

// Lists
// =====
export function addList(req, res) {
  service.addList(req.body)
  .then((list) => res.json(list))
  .error(err => {
    res.status(400)
    res.json({ error: err, list: req.body })
  })
}

export function getLists(req, res) {
  service.getLists()
  .then((lists) => res.json(lists))
  .error(err => {
    res.status(400)
    res.json({ error: err })
  })
}

// Dashboards
// ==========
export function addDashboard(req, res) {
  service.addDashboard(req.body)
  .then((dashboard) => res.json(dashboard))
  .error(err => {
    res.status(400)
    res.json({ error: err, dashboard: req.body })
  })
}

export function getDashboards(req, res) {
  service.getDashboards()
  .then((dashboards) => res.json(dashboards))
  .error(err => {
    res.status(400)
    res.json({ error: err })
  })
}

// Users
// =====
export function loginUser(req, res) {
  res.status(200).send('OK')
}

export function logoutUser(req, res) {
  req.logout()
  res.redirect('/')
}

export function registerUser(req, res, next) {
  service.addUser(req.body)
  .then((user) => {
    if (user.error) next(user.error)
    passport.authenticate('local')(req, res, next, loginUser)
  })
  .error(err => {
    res.status(500).send(err.message)
  })
}
