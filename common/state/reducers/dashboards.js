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
    case types.ADD_DASHBOARD_SUCCESS:
      const { dashboard } = action
      return {
        ...state,
        [dashboard.id]: dashboard
      }

    default:
      return state
  }
}

function currentDashboard(state = '', action) {
  switch(action.type) {
    case types.ADD_DASHBOARD_SUCCESS:
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
    case types.ADD_DASHBOARD_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })

    case types.ADD_DASHBOARD_SUCCESS:
      return {
        dashboardsById: dashboardsById(state.dashboardsById, action),
        currentDashboard: currentDashboard(state.currentDashboard, action),
        isFetching: false
      }

    case types.ADD_DASHBOARD_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      })

    case types.SET_CURRENT_DASHBOARD:
      return Object.assign({}, state, {
        currentDashboard: currentDashboard(state.currentDashboard, action)
      })

    default:
      return state
  }
}
