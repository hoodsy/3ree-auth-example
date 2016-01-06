// import { combineReducers } from 'redux'
import * as types from '../../constants/actionTypes'
// import { lists } from './list'

// State Shape
// ===========
const initialState = {
  byId: {},
  current: '',
  isFetching: false
}

// Private Sub-Reducers
// ====================
function byId(state = {}, action) {
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

function current(state = '', action) {
  switch(action.type) {
    case types.ADD_DASHBOARD_SUCCESS:
      const { dashboard } = action
      if (!state) return dashboard.id
      return state

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
        byId: byId(state.byId, action),
        current: current(state.current, action),
        isFetching: false
      }

    case types.ADD_DASHBOARD_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      })

    default:
      return state
  }
}

// Utility Functions
// =================
export function getCurrentDashboard(state) {
  const { byId, current } = state
  return byId[current]
}
