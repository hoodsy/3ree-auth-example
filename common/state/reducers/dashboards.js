import _ from 'lodash'

import * as types from '../constants/actionTypes'

// State Shape
// ===========
const initialState = {
  dashboardsById: {},
  currentDashboard: '',
  isFetching: false
}

// Private Sub-Reducers
// ====================
function dashboardsById(state = {}, action) {
  switch(action.type) {
    case types.CREATE_DASHBOARD_SUCCESS:
      const { dashboard } = action
      return {
        ...state,
        [dashboard.id]: dashboard
      }

    case types.DELETE_DASHBOARD_SUCCESS:
      console.log(state);
      console.log('========');
      const { dashboardId } = action
      console.log(_.omit(state, dashboardId));
      console.log(dashboardId);
      return _.omit(state, dashboardId)

    default:
      return state
  }
}

function currentDashboard(state = '', action) {
  switch(action.type) {
    case types.CREATE_DASHBOARD_SUCCESS:
      const { dashboard } = action
      if (!state) return dashboard.id
      return state

    case types.SET_CURRENT_DASHBOARD:
      return action.dashboardId

    default:
      return state
  }
}

// Public Reducer
// ==============
export default function dashboards(state = initialState, action) {
  switch (action.type) {
    case types.CREATE_DASHBOARD_REQUEST:
    case types.DELETE_DASHBOARD_REQUEST:
      return {
        ...state,
        isFetching: true
      }

    case types.CREATE_DASHBOARD_SUCCESS:
    case types.DELETE_DASHBOARD_SUCCESS:
      return {
        dashboardsById: dashboardsById(state.dashboardsById, action),
        currentDashboard: currentDashboard(state.currentDashboard, action),
        isFetching: false
      }

    case types.CREATE_DASHBOARD_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }

    case types.SET_CURRENT_DASHBOARD:
      return {
        ...state,
        currentDashboard: currentDashboard(state.currentDashboard, action)
      }

    default:
      return state
  }
}
