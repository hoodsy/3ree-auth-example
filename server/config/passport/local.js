/*
 Configuring local strategy to authenticate strategies
 Code modified from : https://github.com/madhums/node-express-mongoose-demo/blob/master/config/passport/local.js
 */

import { Strategy } from 'passport-local'
import { localAuthCallback } from '../../api/users'

/*
 By default, LocalStrategy expects to find credentials in parameters named username and password.
 If your site prefers to name these fields differently, options are available to change the defaults.
 */
export default new Strategy({ usernameField : 'email' }, localAuthCallback)
