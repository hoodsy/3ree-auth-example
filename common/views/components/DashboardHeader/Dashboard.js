import React, { PropTypes } from 'react'

export const Dashboard = (
  { id,
    title,
    currentDashboard,
    onClick,
    organizationId,
    deleteDashboard }) =>
(
  <div style={ flex }>
    <h1
      onClick={ () => onClick(id) }
      style={{
        ...styles,
        color: id == currentDashboard ? 'BlueViolet' : 'black'
      }}>
      { title }
    </h1>
    <button
      onClick={ () => deleteDashboard( organizationId, id) }
      style={{
        ...styles
      }}>
      Delete
    </button>
  </div>
)

const styles = {
  cursor: 'pointer'
}
const flex = {
  display: 'flex'
}

Dashboard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  currentDashboard: PropTypes.string.isRequired,
  deleteDashboard: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
}
