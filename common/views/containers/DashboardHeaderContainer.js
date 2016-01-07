import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { addDashboard,
         setCurrentDashboard,
         setCurrentInputType } from '../../state/actions'
import { DashboardHeader } from '../'

class DashboardHeaderContainer extends Component {
  render() {
    const {
      dashboards,
      setCurrentDashboard,
      globalInput,
      addDashboard,
      setCurrentInputType
    } = this.props

    return (
      <DashboardHeader
        dashboards={ dashboards }
        setCurrentDashboard={ setCurrentDashboard }
        globalInput={ globalInput }
        setCurrentInputType={ setCurrentInputType }
        addDashboard={ addDashboard }
      />
    )
  }
}

// Can't use created with Date PropType.
// Current bug of error thrown for date Proptype:
// https://github.com/facebook/react-native/issues/4547
DashboardHeaderContainer.propTypes = {
  dashboards: PropTypes.shape({
    byId: PropTypes.objectOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      created: PropTypes.string.isRequired
    })).isRequired,
    current: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired
  }).isRequired,
  setCurrentDashboard: PropTypes.func.isRequired,
  globalInput: PropTypes.shape({
    byId: PropTypes.objectOf(PropTypes.shape({
      inputType: PropTypes.string.isRequired
    })).isRequired,
    current: PropTypes.string.isRequired
  }).isRequired,
  addDashboard: PropTypes.func.isRequired,
  setCurrentInputType: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    dashboards: state.dashboards,
    globalInput: state.globalInput
  }
}

export default connect(
  mapStateToProps,
  { addDashboard,
    setCurrentDashboard,
    setCurrentInputType }
)(DashboardHeaderContainer)
