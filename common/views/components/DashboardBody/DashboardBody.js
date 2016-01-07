import React, { PropTypes } from 'react'
import { ListPicker } from '../../'

export const DashboardBody = (
  { lists,
    setCurrentList }) =>
(
  <ListPicker
    { ...lists }
    setCurrentList={ setCurrentList } />
)

DashboardBody.propTypes = {
  lists: PropTypes.object.isRequired,
  setCurrentList: PropTypes.func.isRequired
}
