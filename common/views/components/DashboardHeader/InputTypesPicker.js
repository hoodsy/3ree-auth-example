import React, { PropTypes } from 'react'
import _ from 'lodash'

import { InputType } from '../../'

export const InputTypesPicker = (
  { inputTypesById,
    currentInputType,
    setCurrentInputType }) =>
(
  <div>
    { _.keys(inputTypesById).map(id =>
        <InputType
          { ...inputTypesById[id] }
          key={ id }
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
