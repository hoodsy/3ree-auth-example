import React, { PropTypes } from 'react'


export const DashboardPicker = ({ byId, current }) => {
  function renderDashboardTitles(id, index) {
    return (
      <h1
        key={ index }
        style={{ color: id == current ? 'red' : 'black' }}>
        { byId[id].title }
      </h1>
    )
  }
  const nodes = Object.keys(byId).map(renderDashboardTitles)
  return <div>{nodes}</div>
}

DashboardPicker.propTypes = {
  byId: PropTypes.objectOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    created: PropTypes.string.isRequired
  })).isRequired,
  current: PropTypes.string.isRequired
}
