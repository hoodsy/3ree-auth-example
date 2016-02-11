import React, { Component, PropTypes } from 'react'

export class OrganizationCreation extends Component {
  handleSubmit(e) {
    const {
      currentUser,
      createOrganization
    } = this.props
    e.preventDefault()
    const node = this.refs.input
    const inputText = node.value.trim()
    if (inputText) {
      createOrganization(inputText, currentUser)
      node.value = ''
    }
  }

  render() {
    return (
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <input
          type="text"
          placeholder="Name your organization"
          ref="input" />
        <button>
          Create Organization
        </button>
      </form>
    )
  }
}

OrganizationCreation.propTypes = {
  currentUser: PropTypes.string.isRequired,
  createOrganization: PropTypes.func.isRequired
}
