import React from 'react'

import { DashboardHeaderContainer,
         DashboardBodyContainer,
         OrganizationSettingsContainer } from '../'

export const DashboardContainer = () =>
(
  <div>
    <OrganizationSettingsContainer />
    <DashboardHeaderContainer />
    <DashboardBodyContainer />
  </div>
)
