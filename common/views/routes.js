import React from 'react'
import Route from 'react-router'

import { App,
         Login,
         DashboardContainer } from '../views'

export default (
  <Route component={ App }>
    <Route path="/" component={ DashboardContainer } />
    <Route path="/login" component={ Login } />
  </Route>
)
