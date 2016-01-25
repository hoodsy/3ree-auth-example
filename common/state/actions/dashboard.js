import request from './util/request'
import * as types from '../constants/actionTypes'
import { addDashboardToUser } from '../actions'

// API Endpoint
// ============
const apiEndpoint = '/api/dashboard'

// Private Actions
// ===============
function addDashboardRequest(title) {
  return {
    type: types.ADD_DASHBOARD_REQUEST,
    title
  }
}
function addDashboardSuccess(dashboard) {
  return {
    type: types.ADD_DASHBOARD_SUCCESS,
    dashboard
  }
}
function addDashboardFailure(err, status) {
  return {
    type: types.ADD_DASHBOARD_FAILURE,
    err,
    status
  }
}

// Public Actions
// ==============
export function addDashboard(title, userId) {
  return (dispatch) => {
    dispatch(addDashboardRequest(title))
    return request('post', { title }, apiEndpoint)
    .then(res => {
      dispatch(addDashboardSuccess(res))
      dispatch(addDashboardToUser(res.id, userId))
    })
    .catch(err => {
      dispatch(addDashboardFailure(err, err.status))
    })
  }
}

export function setCurrentDashboard(dashboardId) {
  return {
    type: types.SET_CURRENT_DASHBOARD,
    dashboardId
  }
}
