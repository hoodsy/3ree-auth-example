import React, { PropTypes } from 'react'

export const InputTypes = (
  { inputTypesById,
    currentInputType,
    onClick }) =>
(
  <div>
    { Object.keys(inputTypesById).map((id, index) =>
      <span
        key={ index }
        onClick={ () => onClick(id) }
        style={{
          ...styles,
          color: id == currentInputType ? 'BlueViolet' : 'black'
        }}>
        { inputTypesById[id].title }
      </span>
    )}
  </div>
)

const styles = {
  padding: 10,
  cursor: 'pointer'
}

InputTypes.propTypes = {
  inputTypesById: PropTypes.object.isRequired,
  currentInputType: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}
