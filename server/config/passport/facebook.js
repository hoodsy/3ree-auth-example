import { Strategy as FacebookStrategy } from 'passport-facebook'
import r from 'rethinkdb'

import config from '../../config/dbConfig'
import { facebook } from './keys'
import { addUser } from '../../api/users'

export default new FacebookStrategy({
  clientID: facebook.clientID,
  clientSecret: facebook.clientSecret,
  callbackURL: facebook.callbackURL
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
        type: 'facebook',
        accessToken,
        refreshToken
      },
      gender: profile.gender || '',
      picture: profile.profileUrl || ''
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
