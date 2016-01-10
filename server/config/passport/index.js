import local from './local'
import google from './google'

export default function (app, passport) {
  // Configure Passport authenticated session persistence.
  //
  // In order to restore authentication state across HTTP requests, Passport needs
  // to serialize users into and deserialize users out of the session.  The
  // typical implementation of this is as simple as supplying the user ID when
  // serializing, and querying the user record by ID from the database when
  // deserializing.
  passport.serializeUser(function(user, done) {
    console.log('serializeUser')
    done(null, user.id)
  })

  passport.deserializeUser(function(id, done) {
    console.log('deserializeUser')
    // User.findById(id, function(err, user) {
    //   done(err, user)
    // })
  })

  // Strategies
  // ==========
  passport.use(local)
  passport.use(google)
}
