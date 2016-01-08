import React, { PropTypes } from 'react'

export const Dashboard = (
  { id,
    title,
    currentDashboard,
    onClick }) =>
(
  <h1
    onClick={ () => onClick(id) }
    style={{
      ...styles,
      color: id == currentDashboard ? 'BlueViolet' : 'black'
    }}>
    { title }
  </h1>
)

const styles = {
  cursor: 'pointer'
}

Dashboard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  currentDashboard: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}
