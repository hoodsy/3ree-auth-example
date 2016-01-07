import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actions from '../../state/actions'
import {
         // AddList,
         // ListContainer,
         DashboardHeaderContainer } from '../'

export default class Dashboard extends Component {
  render() {
    const {
      // addList,
      // addResource,
    } = this.props

    return (
      <div>
        <DashboardHeaderContainer />

        {/*
        <AddList
        <DashboardHeader
          title={ dashboard.title }
        />
        <AddDashboard
          onAddDashboardSubmit={ title => addDashboard(title) }
        />
          onAddListSubmit={ (dashboardId, title) => addList((dashboardId, title)) }
        />
        <ListContainer
          lists={ dashboard.lists }
          onAddSubmit={ (listId, url) => addResource(listId, url) }
        /> */}
      </div>
    )
  }

}

// Dashboard.propTypes = {
//   dashboards: PropTypes.object.isRequired,
//   // addList: PropTypes.func,
//   // addResource: PropTypes.func,
//   addDashboard: PropTypes.func
// }

// function mapStateToProps(state) {
//   return {
//     dashboards: state.dashboards
//   }
// }

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(actions, dispatch)
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
