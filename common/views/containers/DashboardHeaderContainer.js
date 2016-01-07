import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { addDashboard,
         addList,
         setCurrentDashboard,
         setCurrentInputType } from '../../state/actions'
import { DashboardHeader } from '../'

class DashboardHeaderContainer extends Component {
  render() {
    const {
      dashboards,
      setCurrentDashboard,
      inputTypes,
      addDashboard,
      addList,
      setCurrentInputType
    } = this.props

    return (
      <DashboardHeader
        dashboards={ dashboards }
        setCurrentDashboard={ setCurrentDashboard }
        inputTypes={ inputTypes }
        setCurrentInputType={ setCurrentInputType }
        addDashboard={ addDashboard }
        addList={ addList } />
    )
  }
}

// Can't use created with Date PropType.
// Current bug of error thrown for date Proptype:
// https://github.com/facebook/react-native/issues/4547
DashboardHeaderContainer.propTypes = {
  dashboards: PropTypes.shape({
    dashboardsById: PropTypes.objectOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      created: PropTypes.string.isRequired
    })).isRequired,
    currentDashboard: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired
  }).isRequired,
  setCurrentDashboard: PropTypes.func.isRequired,
  inputTypes: PropTypes.shape({
    inputTypesById: PropTypes.objectOf(PropTypes.shape({
      title: PropTypes.string.isRequired
    })).isRequired,
    currentInputType: PropTypes.string.isRequired
  }).isRequired,
  addDashboard: PropTypes.func.isRequired,
  addList: PropTypes.func.isRequired,
  setCurrentInputType: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    dashboards: state.dashboards,
    inputTypes: state.inputTypes
  }
}

export default connect(
  mapStateToProps,
  { addDashboard,
    addList,
    setCurrentDashboard,
    setCurrentInputType }
)(DashboardHeaderContainer)
