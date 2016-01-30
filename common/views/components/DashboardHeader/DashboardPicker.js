import React, { PropTypes } from 'react'
import _ from 'lodash'

import { Dashboard } from '../../'

export const DashboardPicker = (
  { dashboardsById,
    currentDashboard,
    setCurrentDashboard }) =>
(
  <div>
    { _.keys(dashboardsById).map((id, index) =>
        <Dashboard
          { ...dashboardsById[id] }
          key={ index }
          currentDashboard={ currentDashboard }
          onClick={ setCurrentDashboard } />
    )}
  </div>
)

DashboardPicker.propTypes = {
  dashboardsById: PropTypes.object.isRequired,
  currentDashboard: PropTypes.string.isRequired,
  setCurrentDashboard: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired
}
