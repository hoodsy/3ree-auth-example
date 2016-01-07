import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { addDashboard,
         setCurrentDashboard,
         setCurrentInputType } from '../../state/actions'
import { DashboardHeader } from '../'

class DashboardHeaderContainer extends Component {
  render() {
    const {
      byId,
      current,
      isFetching,
      addDashboard,
      setCurrentDashboard,
      globalInput,
      setCurrentInputType
    } = this.props

    return (
      <DashboardHeader
        byId={ byId }
        current={ current }
        isFetching={ isFetching }
        onAddDashboardSubmit={ addDashboard }
        setCurrentDashboard={ setCurrentDashboard }
        globalInput={ globalInput }
        setCurrentInputType={ setCurrentInputType }
      />
    )
  }
}

// Current bug of error thrown for date Proptype:
// https://github.com/facebook/react-native/issues/4547
DashboardHeaderContainer.propTypes = {
  byId: PropTypes.objectOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    created: PropTypes.string.isRequired
  })).isRequired,
  current: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  addDashboard: PropTypes.func.isRequired,
  setCurrentDashboard: PropTypes.func.isRequired,
  setCurrentInputType: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    ...state.dashboards,
    globalInput: state.globalInput
  }
}

export default connect(
  mapStateToProps,
  { addDashboard,
    setCurrentDashboard,
    setCurrentInputType }
)(DashboardHeaderContainer)
