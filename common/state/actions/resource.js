import * as types from '../constants/actionTypes'
import request from 'superagent/lib/client'

// API Endpoint
// ============
const apiEndpoint = '/api/resource'

// Private Actions
// ===============
function addResourceRequest(url) {
  return {
    type: types.ADD_RESOURCE_REQUEST,
    url
  }
}

function addResourceSuccess(resource) {
  return {
    type: types.ADD_RESOURCE_SUCCESS,
    resource
  }
}

function addResourceFailure(error) {
  return {
    type: types.ADD_RESOURCE_FAILURE,
    error
  }
}

// Public Actions
// ==============
export function addResource(listId, url) {
  return (dispatch) => {
    dispatch(addResourceRequest(url))

    return request
      .post(apiEndpoint)
      .send({ listId, url })
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          dispatch(addResourceFailure(err))
        } else {
          dispatch(addResourceSuccess(res.body))
        }
      })
  }
}
