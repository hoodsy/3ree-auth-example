import React, { Component, PropTypes } from 'react'
import _ from 'lodash'

import { User } from '../..'

export class DashboardSettings extends Component {
  handleSubmit(e) {
    const {
      organizationId,
      addUserToOrganization
    } = this.props
    e.preventDefault()
    const node = this.refs.input
    const email = node.value.trim()
    if (email) {
      addUserToOrganization(organizationId, email)
      node.value = ''
    }
  }

  render() {
    const {
      usersById,
      currentUser,
      logoutUser
    } = this.props

    return (
      <div>
        <ul style={ style }>
          { _.keys(usersById).map(id =>
            <User
              { ...usersById[id] }
              key={ id }
              logoutUser={ logoutUser }
              isCurrentUser={ (currentUser === id) ? true : false } />
          )}
        </ul>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input
            type="email"
            placeholder="Add a user by email..."
            ref="input" />
          <button>
            { 'Add User' }
          </button>
        </form>
      </div>
    )
  }
}

const style = {
  display: 'flex',
  padding: '0'
}

DashboardSettings.propTypes = {
  usersById: PropTypes.object.isRequired,
  currentUser: PropTypes.string.isRequired,
  logoutUser: PropTypes.func.isRequired,
  addUserToOrganization: PropTypes.func.isRequired
}
