import request from 'superagent/lib/client'
import { push } from 'redux-simple-router'

import * as types from '../constants/actionTypes'

// API Endpoint
// ============
const apiEndpoint = '/user'

// Private Actions
// ===============
function loginUserRequest(user) {
  return {
    type: types.LOGIN_USER_REQUEST,
    user
  }
}

function loginUserSuccess() {
  return {
    type: types.LOGIN_USER_SUCCESS
  }
}

function loginUserFailure(error) {
  return {
    type: types.LOGIN_USER_FAILURE,
    error
  }
}

function registerUserRequest(user) {
  return {
    type: types.REGISTER_USER_REQUEST,
    user
  }
}

function registerUserSuccess() {
  return {
    type: types.REGISTER_USER_SUCCESS
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
          dispatch(loginUserFailure(err, user))
        } else {
          dispatch(loginUserSuccess(res.body))
          dispatch(push('/'))
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
          dispatch(push('/'))
        }
      })
  }
}
