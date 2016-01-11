import xss from 'xss'
import r from 'rethinkdb'

import config from '../../config/dbConfig'

export function deserializeUser(user, done) {
  return r.connect(config)
  .then(conn => {
    return r
    .table('users')
    .get(user['id'])
    .run(conn)
    .then(function (user) {
      done(null, user)
    })
  })
}

export function localAuthCallback(email, password, done) {
  return r.connect(config)
  .then(conn => {
    return r
    .table('users')
    .getAll(email, { index: 'email' })
    .run(conn)
    .then(cursor => cursor.toArray())
    .then(user => {
      if (!user[0])
        return done(null, false, { message: `Email ${email} not found` })
      if (user[0]['password'] === password) {
        done(null, user[0])
      } else {
        done(null, false, { message: 'Invalid email or password' })
      }
    })
  })
}

export function addUser(user) {
  return r.connect(config)
  .then(conn => {
    user.created = new Date()
    user.email = xss(user.email)
    user.password = xss(user.password)
    return r
    .table('users')
    .getAll(user.email, { index: 'email' })
    .run(conn)
    .then(cursor => cursor.toArray())
    .then(users => {
      if (users.length === 0) {
        return r
        .table('users')
        .insert(user)
        .run(conn)
        .then(response => {
          return Object.assign({}, user, { id: response.generated_keys[0] })
        })
      } else {
        return { error: 'Email already in use.'  }
      }

    })
  })
}
