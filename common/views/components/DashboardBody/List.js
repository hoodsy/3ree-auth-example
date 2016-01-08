import React, { PropTypes } from 'react'
// import { Resource, AddResource } from '../../'

export const List = (
  { id,
    title,
    currentList,
    onClick,
    children }) =>
(
  <h3
    onClick={ () => onClick(id) }
    style={{
      ...styles,
      color: id == currentList ? 'BlueViolet' : 'black'
    }}>
    { title }
    { children }
  </h3>
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

/* this.props.resources.map((resource, index) =>
  <ul>
      <Resource
        { ...resource }
        key={ index }
      />
    )
  </ul>
  <AddResource
    listId={ this.props.id }
    onAddSubmit={ this.props.onAddSubmit }
  />
  */
