import React, { PropTypes } from 'react'

import { DashboardPicker,
         GlobalInput } from '../../'

export const DashboardHeader = (
  { dashboards,
    createDashboard,
    deleteDashboard,
    setCurrentDashboard,
    inputTypes,
    setCurrentInputType,
    listsById,
    currentList,
    createList,
    createResource,
    organizationId }) =>
(
  <div>
    <DashboardPicker
      { ...dashboards }
      deleteDashboard={ deleteDashboard }
      setCurrentDashboard={ setCurrentDashboard }
      organizationId={ organizationId } />
    <GlobalInput
      { ...inputTypes }
      createDashboard={ createDashboard }
      createList={ createList }
      createResource={ createResource }
      currentDashboard={ dashboards.currentDashboard }
      currentList={ currentList }
      listsById={ listsById }
      setCurrentInputType={ setCurrentInputType }
      organizationId={ organizationId } />
  </div>
)

DashboardHeader.propTypes = {
  dashboards: PropTypes.object.isRequired,
  createDashboard: PropTypes.func.isRequired,
  deleteDashboard: PropTypes.func.isRequired,
  setCurrentDashboard: PropTypes.func.isRequired,
  inputTypes: PropTypes.object.isRequired,
  setCurrentInputType: PropTypes.func.isRequired,
  listsById: PropTypes.object.isRequired,
  currentList: PropTypes.string.isRequired,
  createList: PropTypes.func.isRequired,
  createResource: PropTypes.func.isRequired,
  usersById: PropTypes.object.isRequired,
  currentUser: PropTypes.string.isRequired,
  logoutUser: PropTypes.func.isRequired,
  addUserToOrganization: PropTypes.func.isRequired
}
