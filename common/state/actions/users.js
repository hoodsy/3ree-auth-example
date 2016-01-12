import request from 'superagent/lib/client'
import { pushPath } from 'redux-simple-router'

import * as types from '../constants/actionTypes'

// API Endpoint
// ============
const apiEndpoint = '/api/user'

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
          dispatch(pushPath('/'))
        }
      })
  }
}
