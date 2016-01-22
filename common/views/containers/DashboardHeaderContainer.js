import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import * as actions from '../../state/actions'
import { DashboardHeader } from '../'

class DashboardHeaderContainer extends Component {
  render() {
    const {
      dashboards,
      setCurrentDashboard,
      inputTypes,
      addDashboard,
      addList,
      addResource,
      setCurrentInputType,
      currentList,
      listsById,
      user,
      logoutUser
    } = this.props

    return (
      <DashboardHeader
        dashboards={ dashboards }
        setCurrentDashboard={ setCurrentDashboard }
        inputTypes={ inputTypes }
        setCurrentInputType={ setCurrentInputType }
        addDashboard={ addDashboard }
        addList={ addList }
        addResource={ addResource }
        currentList={ currentList }
        listsById={ listsById }
        user={ user }
        logoutUser={ logoutUser } />
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
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    })).isRequired,
    currentInputType: PropTypes.string.isRequired
  }).isRequired,
  addDashboard: PropTypes.func.isRequired,
  addList: PropTypes.func.isRequired,
  addResource: PropTypes.func.isRequired,
  setCurrentInputType: PropTypes.func.isRequired,
  currentList: PropTypes.string.isRequired,
  listsById: PropTypes.objectOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    created: PropTypes.string.isRequired
  })).isRequired,
  user: PropTypes.objectOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.objectOf(PropTypes.shape({
      displayName: PropTypes.string.isRequired,
      givenName: PropTypes.string.isRequired,
      familyName: PropTypes.string.isRequired
    })).isRequired,
    email: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired
  })).isRequired,
  logoutUser: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    dashboards: state.dashboards,
    inputTypes: state.inputTypes,
    currentList: state.lists.currentList,
    listsById: state.lists.listsById,
    user: state.users.user
  }
}

export default connect(
  mapStateToProps,
  { ...actions }
)(DashboardHeaderContainer)
