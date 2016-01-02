import React, { Component, PropTypes } from 'react'

export default class AddList extends Component {

  handleSubmit(e) {
    e.preventDefault()
    const node = this.refs.input
    const text = node.value.trim()
    if (text) {
      this.props.onAddListSubmit(text)
      node.value = ''
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input type="text" ref="input" />
          <button>
            Add List
          </button>
        </form>
      </div>
    )
  }
}

AddList.propTypes = {
  onAddListSubmit: PropTypes.func.isRequired
}
