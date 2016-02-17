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
    case types.ADD_USER_TO_DASHBOARD_SUCCESS:
    case types.ADD_DASHBOARD:
      const { dashboard } = action
      return {
        ...state,
        [dashboard.id]: dashboard
      }

    case types.REMOVE_DASHBOARD:
    case types.DELETE_DASHBOARD_SUCCESS:
      const { dashboardId } = action
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

    case types.REMOVE_DASHBOARD:
    case types.DELETE_DASHBOARD_SUCCESS:
      const { dashboardId } = action
      return _.keys(_.omit(state, dashboardId))[0] || ''

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
    case types.ADD_USER_TO_DASHBOARD_REQUEST:
      return {
        ...state,
        isFetching: true
      }

    case types.CREATE_DASHBOARD_SUCCESS:
    case types.ADD_USER_TO_DASHBOARD_SUCCESS:
      return {
        dashboardsById: dashboardsById(state.dashboardsById, action),
        currentDashboard: currentDashboard(state.currentDashboard, action),
        isFetching: false
      }

    case types.REMOVE_DASHBOARD:
    case types.DELETE_DASHBOARD_SUCCESS:
      return {
        dashboardsById: dashboardsById(state.dashboardsById, action),
        currentDashboard: currentDashboard(state.dashboardsById, action),
        isFetching: false
      }

    case types.CREATE_DASHBOARD_FAILURE:
    case types.DELETE_DASHBOARD_FAILURE:
    case types.ADD_USER_TO_DASHBOARD_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }

    case types.ADD_DASHBOARD:
      return {
        ...state,
        dashboardsById: dashboardsById(state.dashboardsById, action)
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
