import React, { Component, PropTypes } from 'react'

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
    return (
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <input
          type="email"
          placeholder="Add a user by email..."
          ref="input" />
        <button>
          { 'Add User' }
        </button>
      </form>
    )
  }
}

DashboardSettings.propTypes = {

}
