import React, { Component, PropTypes } from 'react'
import _ from 'lodash'

import { User } from '../..'

export class DashboardSettings extends Component {
  handleSubmit(e) {
    const {
      currentDashboard,
      addUserToDashboard
    } = this.props
    e.preventDefault()
    const node = this.refs.input
    const email = node.value.trim()
    if (email) {
      addUserToDashboard(currentDashboard, email)
      node.value = ''
    }
  }

  render() {
    const {
      usersById,
      currentUser,
      logoutUser,
      dashboardsById,
      currentDashboard
    } = this.props

    function renderUsers() {
      const dashboardUsers = dashboardsById[currentDashboard]['users']
      const userIds = _.intersection(_.keys(usersById), dashboardUsers)
      console.log(userIds)
      console.log('============')
      return _.keys(userIds).map(id =>
        <User
          { ...usersById[id] }
          key={ id }
          logoutUser={ logoutUser }
          isCurrentUser={ (currentUser === id) ? true : false } />
      )
    }

    return (
      <div>
        <ul>
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

DashboardSettings.propTypes = {

}
