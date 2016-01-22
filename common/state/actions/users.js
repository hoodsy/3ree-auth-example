import request from 'superagent/lib/client'
import { routeActions } from 'redux-simple-router'

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
function logoutUserSuccess(user) {
  return {
    type: types.LOGOUT_USER_SUCCESS,
    user
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
    return request
      .post(`${authEndpoint}/login`)
      .send({ ...user })
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          dispatch(loginUserFailure(err, res.status))
        } else {
          dispatch(loginUserSuccess(res.body))
          dispatch(routeActions.push('/'))
        }
      })
  }
}
export function logoutUser() {
  return (dispatch) => {
    dispatch(logoutUserRequest())
    return request
      .get(`${authEndpoint}/logout`)
      .send()
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          dispatch(logoutUserFailure(err, res.status))
        } else {
          dispatch(logoutUserSuccess(res.body))
          dispatch(routeActions.replace('/login'))
        }
      })
  }
}
export function registerUser(user) {
  return (dispatch) => {
    dispatch(registerUserRequest(user))
    return request
      .post(`${authEndpoint}/register`)
      .send({ ...user })
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          dispatch(registerUserFailure(err, res.status))
        } else {
          dispatch(registerUserSuccess(res.body))
          dispatch(routeActions.push('/'))
        }
      })
  }
}
// Dashboards
// ----------
export function addDashboardToUser(dashboardId, userId) {
  return (dispatch) => {
    dispatch(addDashboardToUserRequest(dashboardId))
    return request
      .post(`${apiEndpoint}/dashboard`)
      .send({ dashboardId, userId })
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err)
          dispatch(addDashboardToUserFailure(err, res.status))
        else
          dispatch(addDashboardToUserSuccess(res.body))
      })
  }
}
