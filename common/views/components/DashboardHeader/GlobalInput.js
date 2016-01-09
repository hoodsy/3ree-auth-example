import React, { Component, PropTypes } from 'react'

import { InputTypesPicker } from '../../'

export class GlobalInput extends Component {
  _getInputType() {
    const {
      inputTypesById,
      currentInputType
    } = this.props
    return this._capitalize(inputTypesById[currentInputType].title)
  }

  _getCurrentListTitle() {
    const {
      currentList,
      listsById
    } = this.props
    return currentList
      ? ` in ${listsById[currentList].title}`
      : ``
  }

  _getInputAttributes() {
    const inputType = this._getInputType()
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
          placeholder: `Add a ${inputType}${this._getCurrentListTitle()}`
        }
    }
  }

  _mapInputToHandler(inputText) {
    const {
      addDashboard,
      addList,
      addResource,
      currentDashboard,
      currentList
    } = this.props
    const inputType = this._getInputType()

    switch(inputType) {
      case 'Search':
      case 'Dashboard':
        return addDashboard(inputText)
      case 'List':
        return addList(currentDashboard, inputText)
      case 'Resource':
        return addResource(currentList, inputText)
    }
  }

  _capitalize(inputType) {
    return inputType.charAt(0).toUpperCase() + inputType.slice(1)
  }

  handleSubmit(e) {
    e.preventDefault()
    const node = this.refs.input
    const inputText = node.value.trim()
    if (inputText) {
      this._mapInputToHandler(inputText)
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
    } = this._getInputAttributes()

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
            { 'Add ' + this._getInputType() }
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
  addDashboard: PropTypes.func.isRequired,
  addList: PropTypes.func.isRequired
}
