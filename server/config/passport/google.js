import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth'
import r from 'rethinkdb'

import config from '../../config/rethinkDb/dbConfig'
import { google } from './keys'
import { createUser } from '../../api/users'

export default new GoogleStrategy({
  clientID: google.clientID,
  clientSecret: google.clientSecret,
  callbackURL: google.callbackURL
}, (accessToken = '', refreshToken = '', profile, done) => {
  r.connect(config, (err, conn) => {
    createUser(conn, {
      email: profile.emails[0].value || '',
      name: {
        displayName: profile.displayName || '',
        familyName: profile.name.familyName || '',
        givenName: profile.name.givenName || ''
      },
      auth: {
        id: profile.id || '',
        type: 'google',
        accessToken,
        refreshToken
      },
      gender: profile.gender || '',
      picture: profile._json.image.url || ''
    })
    .then(user => {
      if (user.err && user.name) // User already exists
        done(null, user, { message: user.err })
      else if (user.err) { // User creation error
        console.error(`Authentication Error: ${user.err}`) // eslint-disable-line no-console
        done(null, false, { message: user.err })
      } else // User created
        done(null, user, { message: 'Account created with Google.' })
    })
  })
})
