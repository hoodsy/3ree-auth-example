import request from './util/request'
import * as types from '../constants/actionTypes'
import { addDashboardToUser,
         removeDashboardFromUser } from '../actions'

// API Endpoint
// ============
const apiEndpoint = '/api/dashboard'

// Private Actions
// ===============
// Create
// ------
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
// Delete
// ------
function deleteDashboardRequest(dashboardId) {
  return {
    type: types.DELETE_DASHBOARD_REQUEST,
    dashboardId
  }
}
function deleteDashboardSuccess(dashboardId) {
  return {
    type: types.DELETE_DASHBOARD_SUCCESS,
    dashboardId
  }
}
function deleteDashboardFailure(err, status) {
  return {
    type: types.DELETE_DASHBOARD_FAILURE,
    err,
    status
  }
}
// Add User
// --------
function addUserToDashboardRequest(dashboardId, email) {
  return {
    type: types.ADD_USER_TO_DASHBOARD_REQUEST,
    dashboardId,
    email
  }
}
function addUserToDashboardSuccess(dashboard) {
  return {
    type: types.ADD_USER_TO_DASHBOARD_SUCCESS,
    dashboard
  }
}
function addUserToDashboardFailure(err, status) {
  return {
    type: types.ADD_USER_TO_DASHBOARD_FAILURE,
    err,
    status
  }
}

// Public Actions
// ==============
// Create
// ------
export function createDashboard(title, userId) {
  return (dispatch) => {
    dispatch(createDashboardRequest(title))
    return request('post', { title, userId }, apiEndpoint)
    .then(res => {
      dispatch(createDashboardSuccess(res))
      dispatch(addDashboardToUser(res.id, userId))
    })
    .catch(err => {
      dispatch(createDashboardFailure(err, err.status))
    })
  }
}
// Delete
// ------
export function deleteDashboard(id, userId) {
  return (dispatch) => {
    dispatch(deleteDashboardRequest(id))
    return request('delete', { id }, apiEndpoint)
    .then(res => {
      dispatch(deleteDashboardSuccess(id))
      dispatch(removeDashboardFromUser(id, userId))
    })
    .catch(err => {
      dispatch(deleteDashboardFailure(err, err.status))
    })
  }
}
// Add User
// --------
export function addUserToDashboard(dashboardId, email) {
  return (dispatch) => {
    dispatch(addUserToDashboardRequest(dashboardId, email))
    return request('post', { dashboardId, email }, `${apiEndpoint}/add/user`)
    .then(res => {
      dispatch(addUserToDashboardSuccess(res))
    })
    .catch(err => {
      dispatch(addUserToDashboardFailure(err, err.status))
    })
  }
}
// Set Current
// -----------
export function setCurrentDashboard(dashboardId) {
  return {
    type: types.SET_CURRENT_DASHBOARD,
    dashboardId
  }
}
