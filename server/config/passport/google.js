import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth'
import r from 'rethinkdb'

import config from '../../config/rethinkDb/dbConfig'
import { google } from './keys'
import { addUser } from '../../api/users'

export default new GoogleStrategy({
  clientID: google.clientID,
  clientSecret: google.clientSecret,
  callbackURL: google.callbackURL
}, (accessToken = '', refreshToken = '', profile, done) => {
  r.connect(config, (err, conn) => {
    addUser(conn, {
      email: profile.email || '',
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
      if (user.err) {
        console.error(`Authentication Error: ${user.err}`) // eslint-disable-line no-console
        done(null, false, { message: user.err })
      } else
        done(null, user, { message: 'Account created with Google.' })
    })
  })
})
