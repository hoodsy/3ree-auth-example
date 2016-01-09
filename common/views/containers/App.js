import React, { PropTypes } from 'react'

import { DashboardHeaderContainer,
         DashboardBodyContainer } from '../'

export const App = (
  { children }) =>
(
  <div>
    <DashboardHeaderContainer />
    <DashboardBodyContainer />
    { children }
  </div>
)

App.propTypes = {
  children: PropTypes.object
}
