import request from './util/request'
import * as types from '../constants/actionTypes'
import { addOrganizationToUser } from '../actions'

// API Endpoint
// ============
const apiEndpoint = '/api/organization'

// Private Actions
// ===============
// Create
// ------
function createOrganizationRequest(title, userId) {
  return {
    type: types.CREATE_ORGANIZATION_REQUEST,
    title,
    userId
  }
}
function createOrganizationSuccess(organization) {
  return {
    type: types.CREATE_ORGANIZATION_SUCCESS,
    organization
  }
}
function createOrganizationFailure(err, status) {
  return {
    type: types.CREATE_ORGANIZATION_FAILURE,
    err,
    status
  }
}

// Public Actions
// ==============
// Create
// ------
export function createOrganization(title, userId) {
  return (dispatch) => {
    dispatch(createOrganizationRequest(title, userId))
    return request('post', { title, userId }, apiEndpoint)
    .then(res => {
      dispatch(createOrganizationSuccess(res))
      dispatch(addOrganizationToUser(res.id, userId))
    })
    .catch(err => {
      dispatch(createOrganizationFailure(err, err.status))
    })
  }
}
