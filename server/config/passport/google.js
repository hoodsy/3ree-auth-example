import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth'
import r from 'rethinkdb'

import config from '../../config/dbConfig'
import { google } from './keys'
import { addUser } from '../../api/users'

/*
 * OAuth Strategy taken modified from https://github.com/sahat/hackathon-starter/blob/master/config/passport.js
 *
 * - User is already logged in.
 *   - Check if there is an existing account with a provider id.
 *     - If there is, return an error message. (Account merging not supported)
 *     - Else link new OAuth account with currently logged-in user.
 * - User is not logged in.
 *   - Check if it's a returning user.
 *     - If returning user, sign in and we are done.
 *     - Else check if there is an existing account with user's email.
 *       - If there is, return an error message.
 *       - Else create a new account.
 *
 * The Google OAuth 2.0 authentication strategy authenticates users using a Google account and OAuth 2.0 tokens.
 * The strategy requires a verify callback, which accepts these credentials and calls done providing a user, as well
 * as options specifying a client ID, client secret, and callback URL.
 */
module.exports = new GoogleStrategy({
  clientID: google.clientID,
  clientSecret: google.clientSecret,
  callbackURL: google.callbackURL
}, (req, accessToken, refreshToken, profile, done) => {
  console.log(profile);
  console.log('===========');
  if (req.user) {
    console.log('req.user exists');
    console.log('===========');
    const user = addUser(req.dbConn, { email: profile.email }, {
      auth: {
        type: 'google',
        token: profile._json.token
      },
      gender: profile.gender,
      picture: profile.photos[0].url
    })
    if (user.err)
      done({}, user, { message: user.err })
    else
      done({}, user, { message: 'Account created with Google.' })
	// User.findOne({ google: profile.id }, function(err, existingUser) {
	// 	if (existingUser) {
	// 		return done(null, false, { message: 'There is already a Google account that belongs to you. Sign in with that account or delete it, then link it with your current account.'})
	// 	} else {
	// 		User.findById(req.user.id, function(err, user) {
	// 			user.google = profile.id
	// 			user.tokens.push({ kind: 'google', accessToken: accessToken})
	// 			user.profile.name = user.profile.name || profile.displayName
 //        user.profile.gender = user.profile.gender || profile._json.gender
 //        user.profile.picture = user.profile.picture || profile._json.picture
 //        user.save(function(err) {
 //          done(err, user, { message: 'Google account has been linked.' })
 //        })
	// 		})
	// 	}
	// })
  } else {
    console.log('creating user');
    console.log('===========');
    r.connect(config, (err, conn) => {
      addUser(conn, {
        email: profile.email || '',
        firstName: profile.name.givenName || '',
        lastName: profile.name.familyName || '',
        auth: {
          type: 'google',
          token: profile._json.token || ''
        },
        gender: profile.gender || '',
        picture: profile._json.image.url || ''
      })
      .then(user => {
        console.log(user.err, 'in err');
        if (user.err) {
          done(null, false, { message: user.err })
        }
        else {
          done(null, user, { message: 'Account created with Google.' })
        }
      })
    })
    // done({}, profile, { message: 'test' })
	// User.findOne({ google: profile.id }, function(err, existingUser) {
 //    if (existingUser) return done(null, existingUser)
 //    User.findOne({ email: profile._json.emails[0].value }, function(err, existingEmailUser) {
 //      if (existingEmailUser) {
 //        return done(null, false, { message: 'There is already an account using this email address. Sign in to that account and link it with Google manually from Account Settings.'})
 //      } else {
 //        var user = new User()
 //        user.email = profile._json.emails[0].value
 //        user.google = profile.id
 //        user.tokens.push({ kind: 'google', accessToken: accessToken })
 //        user.profile.name = profile.displayName
 //        user.profile.gender = profile._json.gender
 //        user.profile.picture = profile._json.picture
 //        user.save(function(err) {
 //          done(err, user)
 //        })
 //      }
 //    })
 //  })
  }
})
