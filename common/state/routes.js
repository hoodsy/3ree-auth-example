import React from 'react'
import Route from 'react-router'

import { App, Login } from '../views'

// import { requireAuthentication } from 'components/authenticateComponent'

export default (
  <Route path="/" component={App}>
    <Route path="login" component={Login} />
  </Route>
)
