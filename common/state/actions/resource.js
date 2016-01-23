import request from './util/request'
import * as types from '../constants/actionTypes'

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
function addResourceFailure(err, status) {
  return {
    type: types.ADD_RESOURCE_FAILURE,
    err,
    status
  }
}

// Public Actions
// ==============
export function addResource(listId, url) {
  return (dispatch) => {
    dispatch(addResourceRequest(url))
    return request('post', { listId, url }, apiEndpoint)
    .then(res => {
      dispatch(addResourceSuccess(res))
    })
    .catch(err => {
      dispatch(addResourceFailure(err, err.status))
    })
  }
}
