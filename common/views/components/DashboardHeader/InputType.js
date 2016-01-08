import React, { PropTypes } from 'react'

export const InputType = (
  { id,
    title,
    currentInputType,
    onClick }) =>
(
  <span
    onClick={ () => onClick(id) }
    style={{
      ...styles,
      color: id == currentInputType ? 'BlueViolet' : 'black'
    }}>
    { title }
  </span>
)

const styles = {
  padding: 10,
  cursor: 'pointer'
}

InputType.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  currentInputType: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}
