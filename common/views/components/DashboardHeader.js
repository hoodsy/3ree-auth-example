import React, { PropTypes } from 'react'
import { AddDashboard,
         DashboardPicker } from '../'

export const DashboardHeader = (props) => {
  const {
    byId,
    current,
    isFetching,
    onAddDashboardSubmit,
    changeCurrentDashboard
  } = props

  return (
    <div>
      <DashboardPicker
        byId={ byId }
        current={ current }
        isFetching={ isFetching }
        onClick={ changeCurrentDashboard }
      />
      <AddDashboard
        onAddDashboardSubmit={ onAddDashboardSubmit }
      />
    </div>
  )
}

DashboardHeader.propTypes = {
  byId: PropTypes.objectOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    created: PropTypes.string.isRequired
  })).isRequired,
  current: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  onAddDashboardSubmit: PropTypes.func.isRequired,
  changeCurrentDashboard: PropTypes.func.isRequired
}
