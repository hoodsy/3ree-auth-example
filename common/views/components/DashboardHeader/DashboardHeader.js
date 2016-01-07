import React, { PropTypes } from 'react'
import { DashboardPicker,
         GlobalInput } from '../../'

export const DashboardHeader = (props) => {
  const {
    dashboards,
    addDashboard,
    setCurrentDashboard,
    globalInput,
    setCurrentInputType
  } = props

  return (
    <div>
      <DashboardPicker
        { ...dashboards }
        onClick={ setCurrentDashboard }
      />
      <GlobalInput
        { ...globalInput }
        addDashboard={ addDashboard }
        setCurrentInputType={ setCurrentInputType }
      />
    </div>
  )
}

DashboardHeader.propTypes = {
  dashboards: PropTypes.object.isRequired,
  setCurrentDashboard: PropTypes.func.isRequired,
  globalInput: PropTypes.object.isRequired,
  addDashboard: PropTypes.func.isRequired,
  setCurrentInputType: PropTypes.func.isRequired
}
