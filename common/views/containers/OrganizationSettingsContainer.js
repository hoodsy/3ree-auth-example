import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { OrganizationSettings } from '../'

class OrganizationSettingsContainer extends Component {
  render() {
    const {
      organization
    } = this.props

    return (
      <OrganizationSettings
        { ...organization } />
    )
  }
}

OrganizationSettingsContainer.propTypes = {
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
  }).isRequired
}

function mapStateToProps(state) {
  return {
    organization: state.organization
  }
}

export default connect(
  mapStateToProps,
)(OrganizationSettingsContainer)
