import React, { Component, PropTypes } from 'react'
import _ from 'lodash'

import { User } from '../..'
import { extractUsersEmails,
         filterByEmail } from '../../../state/util'

export class OrganizationSettings extends Component {
  userNotInOrganization(email) {
    const {
      usersById
    } = this.props
    return _.isEmpty(filterByEmail(extractUsersEmails(usersById), email))
  }

  handleSubmit(e) {
    const {
      id,
      addUserToOrganization
    } = this.props
    e.preventDefault()
    const node = this.refs.input
    const email = node.value.trim()
    if (email) {
      if (this.userNotInOrganization(email)) {
        addUserToOrganization(id, email)
        node.value = ''
      }
    }
  }

  render() {
    const {
      usersById,
      currentUser,
      logoutUser,
      title
    } = this.props

    return (
      <div style={ containerStyle }>
        <h2>
          { title }
        </h2>
        <ul style={ listStyle }>
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

const listStyle = {
  display: 'flex',
  padding: '0'
}

const containerStyle = {
  display: 'flex',
  flexDirection: 'column'
}

OrganizationSettings.propTypes = {
  usersById: PropTypes.object.isRequired,
  currentUser: PropTypes.string.isRequired,
  logoutUser: PropTypes.func.isRequired,
  addUserToOrganization: PropTypes.func.isRequired
}
