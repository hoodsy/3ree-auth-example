import React, { Component, PropTypes } from 'react'

import { InputTypesPicker } from '../../'

export class GlobalInput extends Component {
  getInputType() {
    const {
      inputTypesById,
      currentInputType
    } = this.props
    return this.capitalize(inputTypesById[currentInputType].title)
  }

  getCurrentListTitle() {
    const {
      currentList,
      listsById
    } = this.props
    return currentList
      ? ` in ${listsById[currentList].title}`
      : ``
  }

  getInputAttributes() {
    const inputType = this.getInputType()
    switch(inputType) {
      case 'Search':
      case 'Dashboard':
      case 'List':
        return {
          type: 'text',
          placeholder: `Create a new ${inputType}`
        }
      case 'Resource':
        return {
          type: 'url',
          placeholder: `Create a ${inputType}${this.getCurrentListTitle()}`
        }
    }
  }

  mapInputToHandler(inputText) {
    const {
      createDashboard,
      createList,
      createResource,
      currentDashboard,
      currentList,
      organizationId
    } = this.props
    const inputType = this.getInputType()

    switch(inputType) {
      case 'Search':
      case 'Dashboard':
        return createDashboard(inputText, organizationId)
      case 'List':
        return createList(currentDashboard, inputText)
      case 'Resource':
        return createResource(currentList, inputText)
    }
  }

  capitalize(inputType) {
    return inputType.charAt(0).toUpperCase() + inputType.slice(1)
  }

  handleSubmit(e) {
    e.preventDefault()
    const node = this.refs.input
    const inputText = node.value.trim()
    if (inputText) {
      this.mapInputToHandler(inputText)
      node.value = ''
    }
  }

  render() {
    const {
      inputTypesById,
      currentInputType,
      setCurrentInputType
    } = this.props
    const {
      type,
      placeholder
    } = this.getInputAttributes()

    return (
      <div>
        <InputTypesPicker
          inputTypesById={ inputTypesById }
          currentInputType={ currentInputType }
          setCurrentInputType={ setCurrentInputType } />
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input
            type={ type }
            placeholder={ placeholder }
            ref="input" />
          <button>
            { 'Create ' + this.getInputType() }
          </button>
        </form>
      </div>
    )
  }
}

GlobalInput.propTypes = {
  inputTypesById: PropTypes.object.isRequired,
  listsById: PropTypes.object.isRequired,
  currentInputType: PropTypes.string.isRequired,
  currentDashboard: PropTypes.string.isRequired,
  currentList: PropTypes.string.isRequired,
  setCurrentInputType: PropTypes.func.isRequired,
  createDashboard: PropTypes.func.isRequired,
  createList: PropTypes.func.isRequired,
  organizationId: PropTypes.string.isRequired
}
