import request from './util/request'
import * as types from '../constants/actionTypes'
import { addUser,
         removeDashboardFromOrganization,
         addDashboardToOrganization } from '../actions'

// API Endpoint
// ============
const apiEndpoint = '/api/dashboard'

// Private Actions
// ===============
// Create
// ------
function createDashboardRequest(title, organizationId) {
  return {
    type: types.CREATE_DASHBOARD_REQUEST,
    title,
    organizationId
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
export function createDashboard(title, organizationId) {
  return (dispatch) => {
    dispatch(createDashboardRequest(title, organizationId))
    return request('post', { title, organizationId }, apiEndpoint)
    .then(res => {
      dispatch(createDashboardSuccess(res))
      dispatch(addDashboardToOrganization(organizationId, res.id))
    })
    .catch(err => {
      dispatch(createDashboardFailure(err, err.status))
    })
  }
}
// Delete
// ------
export function deleteDashboard(organizationId, id) {
  return (dispatch) => {
    dispatch(deleteDashboardRequest(id))
    return request('delete', { id }, apiEndpoint)
    .then(res => { //eslint-disable-line no-unused-vars
      dispatch(deleteDashboardSuccess(id))
      dispatch(removeDashboardFromOrganization(organizationId, id))
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
      const { dashboard, user } = res
      dispatch(addUserToDashboardSuccess(dashboard))
      dispatch(addUser(user))
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
// Utility
// -------
export function addDashboard(dashboard) {
  return {
    type: types.ADD_DASHBOARD,
    dashboard
  }
}
export function removeDashboard({ id }) {
  return {
    type: types.REMOVE_DASHBOARD,
    dashboardId: id
  }
}
