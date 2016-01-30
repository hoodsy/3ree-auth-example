import { routeActions } from 'redux-simple-router'

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
// Dashboard -> User
// -----------------
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
      location.reload()
      dispatch(routeActions.push('/'))
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
      location.reload()
      dispatch(routeActions.push('/login'))
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
// Dashboards
// ----------
export function addDashboardToUser(dashboardId, userId) {
  return (dispatch) => {
    dispatch(addDashboardToUserRequest(dashboardId))
    return request('post', { dashboardId, userId }, `${apiEndpoint}/dashboard`)
    .then(res => {
      dispatch(addDashboardToUserSuccess(res))
    })
    .catch(err => {
      dispatch(addDashboardToUserFailure(err, err.status))
    })
  }
}
