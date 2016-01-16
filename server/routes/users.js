import * as service from '../api/users'

export function loginUser(req, res) {
  res.status(200).send('Login User: Success')
}

export function logoutUser(req, res) {
  req.logout()
  res.redirect('/')
}

export function registerUser(req, res, next) {
  service.addUser(req.body)
  .then((user) => {
    if (user.error) next(user.error)
    // Begin user session
    // via Passport
    req.logIn(user, err => {
      if (err) next(err)
      res.status(200).send('Register User: Success')
    })
  })
  .error(err => {
    res.status(500).send(err.message)
  })
}
