import React from 'react'
import { Route, IndexRoute } from 'react-router'

import { App,
         Login,
         DashboardContainer } from '../views'

export default (store) => {
  const requireAuth = (nextState, replace, callback) => {
    const { users: { isAuthenticated } } = store.getState()
    if (!isAuthenticated) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      })
    }
    callback()
  }
  return (
    <Route path="/" component={ App }>
      <IndexRoute component={ DashboardContainer } onEnter={ requireAuth } />
      <Route path="login" component={ Login } />
    </Route>
  )
}
