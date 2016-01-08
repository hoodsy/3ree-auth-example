import React, { Component, PropTypes } from 'react'

import { InputTypesPicker } from '../../'

export class GlobalInput extends Component {
  _getInputType() {
    const {
      inputTypesById,
      currentInputType
    } = this.props
    return inputTypesById[currentInputType].title
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
      case 'dashboard':
        return addDashboard(inputText)
      case 'list':
        return addList(currentDashboard, inputText)
      case 'resource':
        return addResource(currentList, inputText)
    }
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

    return (
      <div>
        <InputTypesPicker
          inputTypesById={ inputTypesById }
          currentInputType={ currentInputType }
          setCurrentInputType={ setCurrentInputType } />
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input type="text" ref="input" />
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
  currentInputType: PropTypes.string.isRequired,
  currentDashboard: PropTypes.string.isRequired,
  currentList: PropTypes.string.isRequired,
  setCurrentInputType: PropTypes.func.isRequired,
  addDashboard: PropTypes.func.isRequired,
  addList: PropTypes.func.isRequired
}
