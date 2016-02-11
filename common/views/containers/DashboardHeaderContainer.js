import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { DashboardHeader } from '../'
import { createDashboard,
         deleteDashboard,
         setCurrentDashboard,
         setCurrentInputType,
         createList,
         createResource,
         logoutUser,
         addUserToOrganization } from '../../state/actions'

function mapStateToProps(state) {
  return {
    dashboards: state.dashboards,
    inputTypes: state.inputTypes,
    listsById: state.lists.listsById,
    currentList: state.lists.currentList,
    usersById: state.users.usersById,
    currentUser: state.users.currentUser,
    organizationId: state.organization.id
  }
}

class DashboardHeaderContainer extends Component {
  render() {
    const {
      dashboards,
      createDashboard,
      deleteDashboard,
      setCurrentDashboard,
      inputTypes,
      setCurrentInputType,
      listsById,
      currentList,
      createList,
      createResource,
      usersById,
      currentUser,
      logoutUser,
      organizationId,
      addUserToOrganization
    } = this.props

    return (
      <DashboardHeader
        dashboards={ dashboards }
        createDashboard={ createDashboard }
        deleteDashboard={ deleteDashboard }
        setCurrentDashboard={ setCurrentDashboard }
        inputTypes={ inputTypes }
        setCurrentInputType={ setCurrentInputType }
        listsById={ listsById }
        createList={ createList }
        currentList={ currentList }
        createResource={ createResource }
        usersById={ usersById }
        currentUser={ currentUser }
        logoutUser={ logoutUser }
        organizationId={ organizationId }
        addUserToOrganization={ addUserToOrganization } />
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
  createDashboard: PropTypes.func.isRequired,
  deleteDashboard: PropTypes.func.isRequired,
  createList: PropTypes.func.isRequired,
  createResource: PropTypes.func.isRequired,
  setCurrentInputType: PropTypes.func.isRequired,
  listsById: PropTypes.objectOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    created: PropTypes.string.isRequired
  })).isRequired,
  currentList: PropTypes.string.isRequired,
  usersById: PropTypes.objectOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.shape({
      displayName: PropTypes.string,
      givenName: PropTypes.string,
      familyName: PropTypes.string
    }).isRequired,
    email: PropTypes.string.isRequired,
    picture: PropTypes.string
  })).isRequired,
  currentUser: PropTypes.string.isRequired,
  logoutUser: PropTypes.func.isRequired,
  organizationId: PropTypes.string.isRequired,
  addUserToOrganization: PropTypes.func.isRequired
}

export default connect(
  mapStateToProps,
  {
    createDashboard,
    deleteDashboard,
    setCurrentDashboard,
    setCurrentInputType,
    createList,
    createResource,
    logoutUser,
    addUserToOrganization
  }
)(DashboardHeaderContainer)
