import React, { PropTypes } from 'react'

import { DashboardPicker,
         GlobalInput,
         User } from '../../'

export const DashboardHeader = (
  { dashboards,
    createDashboard,
    createList,
    createResource,
    setCurrentDashboard,
    inputTypes,
    setCurrentInputType,
    currentList,
    listsById,
    user,
    logoutUser }) =>
(
  <div>
    <User
      { ...user }
      logoutUser={ logoutUser } />
    <DashboardPicker
      { ...dashboards }
      setCurrentDashboard={ setCurrentDashboard } />
    <GlobalInput
      { ...inputTypes }
      createDashboard={ createDashboard }
      createList={ createList }
      createResource={ createResource }
      currentDashboard={ dashboards.currentDashboard }
      currentList={ currentList }
      listsById={ listsById }
      setCurrentInputType={ setCurrentInputType }
      userId={ user ? user.id : '' } />
  </div>
)

DashboardHeader.propTypes = {
  dashboards: PropTypes.object.isRequired,
  setCurrentDashboard: PropTypes.func.isRequired,
  inputTypes: PropTypes.object.isRequired,
  createDashboard: PropTypes.func.isRequired,
  createList: PropTypes.func.isRequired,
  createResource: PropTypes.func.isRequired,
  setCurrentInputType: PropTypes.func.isRequired,
  currentList: PropTypes.string.isRequired,
  listsById: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired
}
