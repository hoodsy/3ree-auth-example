import React, { PropTypes } from 'react'

import { DashboardHeaderContainer,
         DashboardBodyContainer } from '../'

export const DashboardContainer = () =>
(
  <div>
    <DashboardHeaderContainer />
    <DashboardBodyContainer />
  </div>
)

DashboardContainer.propTypes = {

}
