import passport from 'passport'

import * as service from '../api/users'

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
