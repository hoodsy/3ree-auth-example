import React, { PropTypes } from 'react'
import { ListPicker } from '../../'

export const DashboardBody = (
  { lists,
    resources,
    currentDashboard,
    setCurrentList }) =>
(
  <ListPicker
    { ...lists }
    { ...resources }
    currentDashboard={ currentDashboard }
    setCurrentList={ setCurrentList } />
)

DashboardBody.propTypes = {
  lists: PropTypes.object.isRequired,
  resources: PropTypes.object.isRequired,
  currentDashboard: PropTypes.string.isRequired,
  setCurrentList: PropTypes.func.isRequired
}
