import xss from 'xss'
import r from 'rethinkdb'

import config from '../config/rethinkDb/dbConfig'

export function intoSession(user, done) {
  return done(null, user.id)
}

export function outOfSession(userId, done) {
  return r.connect(config)
  .then(conn => {
    return r
    .table('users')
    .get(userId)
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
        done(null, false, { message: `Email ${email} not found` })
      else if (user[0]['password'] === password)
        done(null, user[0])
      else
        done(null, false, { message: 'Invalid email or password' })
    })
  })
}

// Add User
// ========
// Adds existing user if provided
// email doesn't already exist
// --------
export function addUser(conn, user, fields = {}) {
  user = addUserProperties(user, fields)
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
      return Object.assign({}, users[0], { err: 'Email already in use.' })
    }
  })
  .error(err => err)
}

export function addUserProperties(user, fields) {
  user.created = new Date().toString()
  user.email = xss(user.email)
  user.password = xss(user.password)
  user.dashboards = []
  for (let field in fields) {
    user[field] = fields[field]
  }
  return user
}

// Add Dashboard to User
// =====================
// Adds data to existing user
// ---------------------
export function addDashboardToUser(conn, dashboardId, userId) {
  return r
  .table('users')
  .get(userId)
  .update({ dashboards: r.row('dashboards').append(dashboardId) })
  .run(conn)
  .error(err => err)
}

// Get User
// ========
export function getUser(conn, userId) {
  return r
  .table('users')
  .get(userId)
  .run(conn)
  .error(err => err)
}

