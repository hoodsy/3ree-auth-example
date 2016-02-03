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
    usersById,
    currentUser,
    logoutUser }) =>
(
  <div>
    <User
      { ...usersById[currentUser] }
      logoutUser={ logoutUser } />
    <DashboardSettings
      usersById={ usersById }
      currentUser={ currentUser }
      currentDashboard={ dashboards.currentDashboard }
      addUserToDashboard={ addUserToDashboard } />
    <DashboardPicker
      { ...dashboards }
      userId={ currentUser }
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
      userId={ currentUser } />
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
  usersById: PropTypes.object.isRequired,
  currentUser: PropTypes.string.isRequired,
  logoutUser: PropTypes.func.isRequired
}
