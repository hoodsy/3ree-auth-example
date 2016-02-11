import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { OrganizationSettings } from '../'
import { logoutUser,
         addUserToOrganization } from '../../state/actions'

function mapStateToProps(state) {
  return {
    usersById: state.users.usersById,
    currentUser: state.users.currentUser,
    organization: state.organization
  }
}

class OrganizationSettingsContainer extends Component {
  render() {
    const {
      usersById,
      currentUser,
      logoutUser,
      organization,
      addUserToOrganization
    } = this.props

    return (
      <OrganizationSettings
        { ...organization }
        usersById={ usersById }
        currentUser={ currentUser }
        logoutUser={ logoutUser }
        addUserToOrganization={ addUserToOrganization } />
    )
  }
}

OrganizationSettingsContainer.propTypes = {
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
  organization: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    created: PropTypes.string.isRequired,
    dashboards: PropTypes.arrayOf(
      PropTypes.string
    ).isRequired,
    users: PropTypes.arrayOf(
      PropTypes.string
    ).isRequired
  }).isRequired,
  addUserToOrganization: PropTypes.func.isRequired
}

export default connect(
  mapStateToProps,
  {
    logoutUser,
    addUserToOrganization
  }
)(OrganizationSettingsContainer)
