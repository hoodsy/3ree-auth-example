import request from './util/request'
import * as types from '../constants/actionTypes'
import { addOrganizationToUser,
         addUser } from '../actions'

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
// Add User
// --------
function addUserToOrganizationRequest(organizationId, email) {
  return {
    type: types.ADD_USER_TO_ORGANIZATION_REQUEST,
    organizationId,
    email
  }
}
function addUserToOrganizationSuccess(organization) {
  return {
    type: types.ADD_USER_TO_ORGANIZATION_SUCCESS,
    organization
  }
}
function addUserToOrganizationFailure(err, status) {
  return {
    type: types.ADD_USER_TO_ORGANIZATION_FAILURE,
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
// Add User
// --------
export function addUserToOrganization(organizationId, email) {
  return (dispatch) => {
    dispatch(addUserToOrganizationRequest(organizationId, email))
    return request('post', { organizationId, email }, `${apiEndpoint}/add/user`)
    .then(res => {
      const { organization, user } = res
      dispatch(addUserToOrganizationSuccess(organization))
      dispatch(addUser(user))
    })
    .catch(err => {
      dispatch(addUserToOrganizationFailure(err, err.status))
    })
  }
}
