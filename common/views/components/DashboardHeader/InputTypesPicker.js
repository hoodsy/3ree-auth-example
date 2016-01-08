import React, { PropTypes } from 'react'

import { InputType } from '../../'

export const InputTypesPicker = (
  { inputTypesById,
    currentInputType,
    setCurrentInputType }) =>
(
  <div>
    { Object.keys(inputTypesById).map((id, index) =>
      <InputType
        { ...inputTypesById[id] }
        key={ index }
        currentInputType={ currentInputType }
        onClick={ setCurrentInputType } />
    )}
  </div>
)

InputTypesPicker.propTypes = {
  inputTypesById: PropTypes.object.isRequired,
  currentInputType: PropTypes.string.isRequired,
  setCurrentInputType: PropTypes.func.isRequired
}
