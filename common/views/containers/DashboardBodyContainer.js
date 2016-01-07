import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { DashboardBody } from '../'
import { setCurrentList } from '../../state/actions'

class DashboardBodyContainer extends Component {
  render() {
    const {
      lists,
      setCurrentList
    } = this.props

    return (
      <DashboardBody
        lists={ lists }
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
  }).isRequired
}

function mapStateToProps(state) {
  return {
    lists: state.lists
    // resources: state.resources
  }
}

export default connect(
  mapStateToProps,
  { setCurrentList }
)(DashboardBodyContainer)
