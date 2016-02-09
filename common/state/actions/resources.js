import request from './util/request'
import * as types from '../constants/actionTypes'

// API Endpoint
// ============
const apiEndpoint = '/api/resource'

// Private Actions
// ===============
function createResourceRequest(url) {
  return {
    type: types.CREATE_RESOURCE_REQUEST,
    url
  }
}
function createResourceSuccess(resource) {
  return {
    type: types.CREATE_RESOURCE_SUCCESS,
    resource
  }
}
function createResourceFailure(err, status) {
  return {
    type: types.CREATE_RESOURCE_FAILURE,
    err,
    status
  }
}

// Public Actions
// ==============
export function createResource(listId, url) {
  return (dispatch) => {
    dispatch(createResourceRequest(url))
    return request('post', { listId, url }, apiEndpoint)
    .then(res => {
      dispatch(createResourceSuccess(res))
    })
    .catch(err => {
      dispatch(createResourceFailure(err, err.status))
    })
  }
}
