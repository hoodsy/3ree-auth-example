import React, { PropTypes } from 'react'

export const DashboardPicker = (
  { dashboardsById,
    currentDashboard,
    setCurrentDashboard }) =>
(
  <div>
    { Object.keys(dashboardsById).map((id, index) =>
      <h1
        key={ index }
        onClick={ () => setCurrentDashboard(id) }
        style={{
          ...styles,
          color: id == currentDashboard ? 'BlueViolet' : 'black'
        }}>
        { dashboardsById[id].title }
      </h1>
    )}
  </div>
)

const styles = {
  cursor: 'pointer'
}

DashboardPicker.propTypes = {
  dashboardsById: PropTypes.object.isRequired,
  currentDashboard: PropTypes.string.isRequired,
  setCurrentDashboard: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired
}
