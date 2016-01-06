import React, { PropTypes } from 'react'
import { AddDashboard,
         DashboardPicker } from '../'

export const DashboardHeader = (props) => {
  const {
    byId,
    current,
    // isFetching,
    onAddDashboardSubmit
  } = props

  return (
    <div>
      <DashboardPicker
        byId={ byId }
        current={ current }
      />
      <AddDashboard
        onAddDashboardSubmit={ onAddDashboardSubmit }
      />
    </div>
  )
}

DashboardHeader.propTypes = {
  // title: PropTypes.string.isRequired
}
