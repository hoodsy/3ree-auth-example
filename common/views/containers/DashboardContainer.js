import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { createOrganization } from '../../state/actions'
import { DashboardHeaderContainer,
         DashboardBodyContainer,
         OrganizationSettingsContainer,
         OrganizationCreation } from '../'

class DashboardContainer extends Component {
  renderDashboard() {
    return (
      <div>
        <OrganizationSettingsContainer />
        <DashboardHeaderContainer />
        <DashboardBodyContainer />
      </div>
    )
  }

  renderOrganizationCreation() {
    const {
      currentUser,
      createOrganization
    } = this.props
    return (
      <OrganizationCreation
        currentUser={ currentUser }
        createOrganization={ createOrganization }/>
    )
  }

  render() {
    const {
      usersById,
      currentUser
    } = this.props

    const hasOrganization = currentUser != ''
      ? usersById[currentUser]['organizationId'] != ''
      : false
    return hasOrganization
      ? this.renderDashboard()
      : this.renderOrganizationCreation()
  }
}

DashboardContainer.propTypes = {
  usersById: PropTypes.objectOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.shape({
      displayName: PropTypes.string.isRequired,
      givenName: PropTypes.string.isRequired,
      familyName: PropTypes.string.isRequired
    }).isRequired,
    email: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired
  })).isRequired,
  currentUser: PropTypes.string.isRequired
}

function mapStateToProps(state) {
  return {
    usersById: state.users.usersById,
    currentUser: state.users.currentUser
  }
}

export default connect(
  mapStateToProps,
  { createOrganization }
)(DashboardContainer)
