import React, { PropTypes } from 'react'
import _ from 'lodash'

import { Dashboard } from '../../'

export const DashboardPicker = (
  { dashboardsById,
    currentDashboard,
    setCurrentDashboard,
    userId,
    deleteDashboard }) =>
(
  <div>
    { _.keys(dashboardsById).map(id =>
        <Dashboard
          { ...dashboardsById[id] }
          key={ id }
          currentDashboard={ currentDashboard }
          onClick={ setCurrentDashboard }
          userId={ userId }
          deleteDashboard={ deleteDashboard } />
    )}
  </div>
)

DashboardPicker.propTypes = {
  dashboardsById: PropTypes.object.isRequired,
  currentDashboard: PropTypes.string.isRequired,
  setCurrentDashboard: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  deleteDashboard: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired
}
