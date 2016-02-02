import React, { PropTypes } from 'react'

import { DashboardPicker,
         DashboardSettings,
         GlobalInput,
         User } from '../../'

export const DashboardHeader = (
  { dashboards,
    createDashboard,
    deleteDashboard,
    addUserToDashboard,
    setCurrentDashboard,
    inputTypes,
    setCurrentInputType,
    listsById,
    currentList,
    createList,
    createResource,
    user,
    logoutUser }) =>
(
  <div>
    <User
      { ...user }
      logoutUser={ logoutUser } />
    <DashboardSettings
      currentDashboard={ dashboards.currentDashboard }
      addUserToDashboard={ addUserToDashboard } />
    <DashboardPicker
      { ...dashboards }
      userId={ user ? user.id : '' }
      deleteDashboard={ deleteDashboard }
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
  createDashboard: PropTypes.func.isRequired,
  deleteDashboard: PropTypes.func.isRequired,
  addUserToDashboard: PropTypes.func.isRequired,
  setCurrentDashboard: PropTypes.func.isRequired,
  inputTypes: PropTypes.object.isRequired,
  setCurrentInputType: PropTypes.func.isRequired,
  listsById: PropTypes.object.isRequired,
  currentList: PropTypes.string.isRequired,
  createList: PropTypes.func.isRequired,
  createResource: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired
}
