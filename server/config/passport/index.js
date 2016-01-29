import local from './local'
import google from './google'
import facebook from './facebook'
import { intoSession,
         outOfSession } from '../../api/users'

export default function (passport) {
  // Session Control
  // ===============
  passport.serializeUser(intoSession)
  passport.deserializeUser(outOfSession)

  // Strategies
  // ==========
  passport.use(local)
  passport.use(google)
  passport.use(facebook)
}
