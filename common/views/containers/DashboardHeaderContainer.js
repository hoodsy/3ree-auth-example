import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { addDashboard,
         changeCurrentDashboard } from '../../state/actions'
import { DashboardHeader } from '../'
// import { getCurrentDashboard } from '../../state/actions'

class DashboardHeaderContainer extends Component {
  render() {
    const {
      byId,
      current,
      isFetching,
      addDashboard,
      changeCurrentDashboard
    } = this.props

    return (
      <DashboardHeader
        byId={ byId }
        current={ current }
        isFetching={ isFetching }
        onAddDashboardSubmit={ title => addDashboard(title) }
        changeCurrentDashboard={ dashboardId => changeCurrentDashboard(dashboardId) }
      />
    )
  }
}

DashboardHeaderContainer.propTypes = {
  byId: PropTypes.objectOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    created: PropTypes.string.isRequired
  })).isRequired,
  current: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  addDashboard: PropTypes.func.isRequired,
  changeCurrentDashboard: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    ...state.dashboards,
    addDashboard: state.addDashboard
  }
}

export default connect(
  mapStateToProps,
  { addDashboard,
    changeCurrentDashboard }
)(DashboardHeaderContainer)
