import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { DashboardHeaderContainer,
         DashboardBodyContainer,
         OrganizationSettingsContainer,
         OrganizationCreation } from '../'
import { createOrganization } from '../../state/actions'

function mapStateToProps(state) {
  return {
    usersById: state.users.usersById,
    currentUser: state.users.currentUser
  }
}

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
      displayName: PropTypes.string,
      givenName: PropTypes.string,
      familyName: PropTypes.string
    }),
    email: PropTypes.string.isRequired,
    picture: PropTypes.string
  })).isRequired,
  currentUser: PropTypes.string.isRequired,
  createOrganization: PropTypes.func.isRequired
}

export default connect(
  mapStateToProps,
  {
    createOrganization
  }
)(DashboardContainer)
