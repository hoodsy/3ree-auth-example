import request from 'superagent/lib/client'
import { routeActions } from 'redux-simple-router'

import * as types from '../constants/actionTypes'

// API Endpoint
// ============
const apiEndpoint = '/auth'

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

// Public Actions
// ==============
export function loginUser(user) {
  return (dispatch) => {
    dispatch(loginUserRequest(user))
    return request
      .post(`${apiEndpoint}/login`)
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

export function registerUser(user) {
  return (dispatch) => {
    dispatch(registerUserRequest(user))
    return request
      .post(`${apiEndpoint}/register`)
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
