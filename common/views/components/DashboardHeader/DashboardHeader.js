import React, { PropTypes } from 'react'
import { DashboardPicker,
         GlobalInput } from '../../'

export const DashboardHeader = (props) => {
  const {
    byId,
    current,
    isFetching,
    onAddDashboardSubmit,
    setCurrentDashboard,
    globalInput,
    setCurrentInputType
  } = props

  return (
    <div>
      <DashboardPicker
        byId={ byId }
        current={ current }
        isFetching={ isFetching }
        onClick={ setCurrentDashboard }
      />
      <GlobalInput
        { ...globalInput }
        onAddDashboardSubmit={ onAddDashboardSubmit }
        setCurrentInputType={ setCurrentInputType }
      />
    </div>
  )
}

DashboardHeader.propTypes = {
  byId: PropTypes.object.isRequired,
  current: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  onAddDashboardSubmit: PropTypes.func.isRequired,
  setCurrentDashboard: PropTypes.func.isRequired,
  setCurrentInputType: PropTypes.func.isRequired
}
