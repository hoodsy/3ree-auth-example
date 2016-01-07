import React, { PropTypes } from 'react'
import { DashboardPicker,
         InputTypesPicker } from '../../'

export const DashboardHeader = (props) => {
  const {
    dashboards,
    addDashboard,
    addList,
    setCurrentDashboard,
    inputTypes,
    setCurrentInputType
  } = props

  return (
    <div>
      <DashboardPicker
        { ...dashboards }
        setCurrentDashboard={ setCurrentDashboard } />
      <InputTypesPicker
        { ...inputTypes }
        addDashboard={ addDashboard }
        addList={ addList }
        setCurrentInputType={ setCurrentInputType } />
    </div>
  )
}

DashboardHeader.propTypes = {
  dashboards: PropTypes.object.isRequired,
  setCurrentDashboard: PropTypes.func.isRequired,
  inputTypes: PropTypes.object.isRequired,
  addDashboard: PropTypes.func.isRequired,
  addList: PropTypes.func.isRequired,
  setCurrentInputType: PropTypes.func.isRequired
}
