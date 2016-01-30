import React from 'react'
import Route, { IndexRoute } from 'react-router'

import { App,
         Login,
         DashboardContainer } from '../views'
import { loadData } from '../state/actions'

export default (store) => {
  const requireAuth = (nextState, replace, callback) => {
    const { users: { user: { isAuthenticated } } } = store.getState()
    if (!isAuthenticated) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      })
    }
    //  else {
    //   store.dispatch(loadData)
    // }
    callback()
  }
  return (
    <Route path="/" component={ App }>
      <IndexRoute component={ DashboardContainer } onEnter={ requireAuth } />
      <Route path="login" component={ Login } />
    </Route>
  )
}

