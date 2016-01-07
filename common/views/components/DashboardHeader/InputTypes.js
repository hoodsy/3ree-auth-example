import React, { PropTypes } from 'react'

export const InputTypes = ({ byId, current, onClick }) => {
  function renderInputTypes(id, index) {
    return (
      <span
        key={ index }
        onClick={ () => onClick(id) }
        style={{
          ...styles,
          color: id == current ? 'red' : 'black'
        }}>
        { byId[id].inputType }
      </span>
    )
  }
  const nodes = Object.keys(byId).map(renderInputTypes)
  return <div>{ nodes }</div>
}

const styles = {
  padding: 10,
  cursor: 'pointer'
}

InputTypes.propTypes = {
  byId: PropTypes.object.isRequired,
  current: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}
