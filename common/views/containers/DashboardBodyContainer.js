import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { ListPicker } from '../'
import { setCurrentList } from '../../state/actions'

function mapStateToProps(state) {
  return {
    lists: state.lists,
    resources: state.resources,
    currentDashboard: state.dashboards.currentDashboard
  }
}

class DashboardBodyContainer extends Component {
  render() {
    const {
      lists,
      resources,
      currentDashboard,
      setCurrentList
    } = this.props

    return (
      <ListPicker
        { ...lists }
        { ...resources }
        currentDashboard={ currentDashboard }
        setCurrentList={ setCurrentList } />
    )
  }
}

DashboardBodyContainer.propTypes = {
  lists: PropTypes.shape({
    listsById: PropTypes.objectOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      created: PropTypes.string.isRequired
    })).isRequired,
    currentList: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired
  }).isRequired,
  resources: PropTypes.shape({
    resourcesById: PropTypes.objectOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      created: PropTypes.string.isRequired
    })).isRequired,
    isFetching: PropTypes.bool.isRequired
  }).isRequired,
  currentDashboard: PropTypes.string.isRequired,
  setCurrentList: PropTypes.func.isRequired
}

export default connect(
  mapStateToProps,
  {
    setCurrentList
  }
)(DashboardBodyContainer)
