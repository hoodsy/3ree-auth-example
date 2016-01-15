import local from './local'
// import google from './google'
import { deserializeUser } from '../../api/service'
export default function (passport) {
  // Configure Passport authenticated session persistence.
  //
  // In order to restore authentication state across HTTP requests, Passport needs
  // to serialize users into and deserialize users out of the session.  The
  // typical implementation of this is as simple as supplying the user ID when
  // serializing, and querying the user record by ID from the database when
  // deserializing.
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser(deserializeUser)

  // Strategies
  // ==========
  passport.use(local)
  // passport.use(google)
}

export function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) next()
  else res.status(400).send('Please login to continue.')
}
