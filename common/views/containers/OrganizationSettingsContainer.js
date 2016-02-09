import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { OrganizationSettings } from '../'

class OrganizationSettingsContainer extends Component {
  render() {

    return (
      <OrganizationSettings />
    )
  }
}

OrganizationSettingsContainer.propTypes = {

}

function mapStateToProps(state) {
  return {
    users: state.users,
  }
}

export default connect(
  mapStateToProps,
  // { setCurrentList }
)(OrganizationSettingsContainer)
