import * as service from '../api/users'

export function loginUser(req, res) {
  res.status(200).json({
    name: req.user.name,
    email: req.user.email,
    picture: req.user.picture
  })
}

export function logoutUser(req, res) {
  req.logout()
  res.redirect('/')
}

export function registerUser(req, res, next) {
  service.addUser(req.dbConn, req.body)
  .then((user) => {
    if (user.error) next(user.error)
    // Begin user session
    // via Passport
    req.logIn(user, err => {
      if (err) next(err)
      res.status(200).json({
        name: user.name,
        email: user.email,
        picture: user.picture
      })
    })
  })
  .error(err => {
    err.status = 500
    next(err)
  })
}
