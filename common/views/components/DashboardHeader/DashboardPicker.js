import React, { PropTypes } from 'react'

export const DashboardPicker = ({ byId, current, onClick }) => {
  function renderDashboardTitles(id, index) {
    return (
      <h1
        key={ index }
        onClick={ () => onClick(id) }
        style={{
          ...styles,
          color: id == current ? 'red' : 'black'
        }}>
        { byId[id].title }
      </h1>
    )
  }
  const nodes = Object.keys(byId).map(renderDashboardTitles)
  return <div>{ nodes }</div>
}

const styles = {
  cursor: 'pointer'
}

DashboardPicker.propTypes = {
  byId: PropTypes.object.isRequired,
  current: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired
}
