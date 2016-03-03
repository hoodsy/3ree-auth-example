import { routeActions } from 'react-router-redux'

import request from './util/request'
import * as types from '../constants/actionTypes'

// API Endpoints
// =============
const authEndpoint = '/auth'
const apiEndpoint = '/api/user'

// Private Actions
// ===============
// Login
// -----
function loginUserRequest(user) {
  return {
    type: types.LOGIN_USER_REQUEST,
    user
  }
}
function loginUserSuccess(user) {
  return {
    type: types.LOGIN_USER_SUCCESS,
    user
  }
}
function loginUserFailure(err, status) {
  return {
    type: types.LOGIN_USER_FAILURE,
    err,
    status
  }
}
// Logout
// ------
function logoutUserRequest() {
  return {
    type: types.LOGOUT_USER_REQUEST
  }
}
function logoutUserSuccess() {
  return {
    type: types.LOGOUT_USER_SUCCESS
  }
}
function logoutUserFailure(err, status) {
  return {
    type: types.LOGOUT_USER_FAILURE,
    err,
    status
  }
}
// Register
// --------
function registerUserRequest(user) {
  return {
    type: types.REGISTER_USER_REQUEST,
    user
  }
}
function registerUserSuccess(user) {
  return {
    type: types.REGISTER_USER_SUCCESS,
    user
  }
}
function registerUserFailure(err, status) {
  return {
    type: types.REGISTER_USER_FAILURE,
    err,
    status
  }
}
// Organizations
// ---------
function addOrganizationToUserRequest(organizationId) {
  return {
    type: types.ADD_ORGANIZATION_TO_USER_REQUEST,
    organizationId
  }
}
function addOrganizationToUserSuccess(user) {
  return {
    type: types.ADD_ORGANIZATION_TO_USER_SUCCESS,
    user
  }
}
function addOrganizationToUserFailure(err, status) {
  return {
    type: types.ADD_ORGANIZATION_TO_USER_FAILURE,
    err,
    status
  }
}
// Dashboards
// ---------
function addDashboardToUserRequest(dashboardId) {
  return {
    type: types.ADD_DASHBOARD_TO_USER_REQUEST,
    dashboardId
  }
}
function addDashboardToUserSuccess(user) {
  return {
    type: types.ADD_DASHBOARD_TO_USER_SUCCESS,
    user
  }
}
function addDashboardToUserFailure(err, status) {
  return {
    type: types.ADD_DASHBOARD_TO_USER_FAILURE,
    err,
    status
  }
}
function removeDashboardFromUserRequest(dashboardId) {
  return {
    type: types.REMOVE_DASHBOARD_FROM_USER_REQUEST,
    dashboardId
  }
}
function removeDashboardFromUserSuccess(user) {
  return {
    type: types.REMOVE_DASHBOARD_FROM_USER_SUCCESS,
    user
  }
}
function removeDashboardFromUserFailure(err, status) {
  return {
    type: types.REMOVE_DASHBOARD_FROM_USER_FAILURE,
    err,
    status
  }
}
// Utility
// -------
function getUserRequest(userId) {
  return {
    type: types.GET_USER_REQUEST,
    userId
  }
}
function getUserSuccess(user) {
  return {
    type: types.GET_USER_SUCCESS,
    user
  }
}
function getUserFailure(err, status) {
  return {
    type: types.GET_USER_FAILURE,
    err,
    status
  }
}

// Public Actions
// ==============
// Authentication
// --------------
export function loginUser(user) {
  return (dispatch) => {
    dispatch(loginUserRequest(user))
    return request('post', { ...user }, `${authEndpoint}/login`)
    .then(res => {
      dispatch(loginUserSuccess(res))
      dispatch(routeActions.push('/'))
      location.reload()
    })
    .catch(err => {
      dispatch(loginUserFailure(err, err.status))
    })
  }
}
export function logoutUser() {
  return (dispatch) => {
    dispatch(logoutUserRequest())
    return request('get', {}, `${authEndpoint}/logout`)
    .then(res => { // eslint-disable-line no-unused-vars
      dispatch(logoutUserSuccess())
      dispatch(routeActions.push('/login'))
      location.reload()
    })
    .catch(err => {
      dispatch(logoutUserFailure(err, err.status))
    })
  }
}
export function registerUser(user) {
  return (dispatch) => {
    dispatch(registerUserRequest(user))
    return request('post', { ...user }, `${authEndpoint}/register`)
    .then(res => {
      dispatch(registerUserSuccess(res))
      dispatch(routeActions.push('/'))
    })
    .catch(err => {
      dispatch(registerUserFailure(err, err.status))
    })
  }
}
// Organizations
// ----------
export function addOrganizationToUser(organizationId, userId) {
  return (dispatch) => {
    dispatch(addOrganizationToUserRequest(organizationId))
    return request('post', { organizationId, userId }, `${apiEndpoint}/organization/join`)
    .then(res => {
      dispatch(addOrganizationToUserSuccess(res))
    })
    .catch(err => {
      dispatch(addOrganizationToUserFailure(err, err.status))
    })
  }
}
// Dashboards
// ----------
export function addDashboardToUser(dashboardId, userId) {
  return (dispatch) => {
    dispatch(addDashboardToUserRequest(dashboardId))
    return request('post', { dashboardId, userId }, `${apiEndpoint}/dashboard/add`)
    .then(res => {
      dispatch(addDashboardToUserSuccess(res))
    })
    .catch(err => {
      dispatch(addDashboardToUserFailure(err, err.status))
    })
  }
}
export function removeDashboardFromUser(dashboardId, userId) {
  return (dispatch) => {
    dispatch(removeDashboardFromUserRequest(dashboardId))
    return request('post', { dashboardId, userId }, `${apiEndpoint}/dashboard/remove`)
    .then(res => {
      dispatch(removeDashboardFromUserSuccess(res))
    })
    .catch(err => {
      dispatch(removeDashboardFromUserFailure(err, err.status))
    })
  }
}
// Utility
// -------
export function getUser(userId) {
  return (dispatch) => {
    dispatch(getUserRequest(userId))
    return request('get', {}, `${apiEndpoint}/${userId}`)
    .then(res => {
      dispatch(getUserSuccess(res))
    })
    .catch(err => {
      dispatch(getUserFailure(err, err.status))
    })
  }
}
export function addUser(user) {
  return {
    type: types.ADD_USER,
    user
  }
}
