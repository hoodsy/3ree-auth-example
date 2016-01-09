import React, { PropTypes } from 'react'

export const List = (
  { id,
    title,
    currentList,
    onClick,
    children }) =>
(
  <div>
    <h3
      onClick={ () => onClick(id) }
      style={{
        ...styles,
        color: id == currentList ? 'BlueViolet' : 'black'
      }}>
      { title }
    </h3>
    <ul>
      { children }
    </ul>
  </div>
)

const styles = {
  cursor: 'pointer'
}

List.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  created: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}
