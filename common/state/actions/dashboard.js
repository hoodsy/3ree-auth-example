import request from './util/request'
import * as types from '../constants/actionTypes'
import { addDashboardToUser } from '../actions'

// API Endpoint
// ============
const apiEndpoint = '/api/dashboard'

// Private Actions
// ===============
function createDashboardRequest(title) {
  return {
    type: types.CREATE_DASHBOARD_REQUEST,
    title
  }
}
function createDashboardSuccess(dashboard) {
  return {
    type: types.CREATE_DASHBOARD_SUCCESS,
    dashboard
  }
}
function createDashboardFailure(err, status) {
  return {
    type: types.CREATE_DASHBOARD_FAILURE,
    err,
    status
  }
}

// Public Actions
// ==============
export function createDashboard(title, userId) {
  return (dispatch) => {
    dispatch(createDashboardRequest(title))
    return request('post', { title }, apiEndpoint)
    .then(res => {
      dispatch(createDashboardSuccess(res))
      dispatch(addDashboardToUser(res.id, userId))
    })
    .catch(err => {
      dispatch(createDashboardFailure(err, err.status))
    })
  }
}

export function setCurrentDashboard(dashboardId) {
  return {
    type: types.SET_CURRENT_DASHBOARD,
    dashboardId
  }
}
