import React, { Component, PropTypes } from 'react'
import { InputTypes } from '../../'

export class InputTypesPicker extends Component {
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
      currentInputType
    } = this.props
    const inputType = this._getInputType()

    switch(inputType) {
      case 'dashboard':
        return addDashboard(inputText)
      case 'list':
        return addList(currentInputType, inputText)
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    const node = this.refs.input
    const inputText = node.value.trim()
    if (inputText) {
      // this.props.onInputTypesPickerSubmit(inputText)
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
        <InputTypes
          inputTypesById={ inputTypesById }
          currentInputType={ currentInputType }
          onClick={ setCurrentInputType } />
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

InputTypesPicker.propTypes = {
  inputTypesById: PropTypes.object.isRequired,
  currentInputType: PropTypes.string.isRequired,
  setCurrentInputType: PropTypes.func.isRequired,
  addDashboard: PropTypes.func.isRequired,
  addList: PropTypes.func.isRequired
}
