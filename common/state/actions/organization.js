import request from './util/request'
import * as types from '../constants/actionTypes'
import { addUser,
         addOrganizationToUser } from '../actions'

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
// Add Dashboard
// -------------
function addDashboardToOrganizationRequest(organizationId, dashboardId) {
  return {
    type: types.ADD_DASHBOARD_TO_ORGANIZATION_REQUEST,
    organizationId,
    dashboardId
  }
}
function addDashboardToOrganizationSuccess(organization) {
  return {
    type: types.ADD_DASHBOARD_TO_ORGANIZATION_SUCCESS,
    organization
  }
}
function addDashboardToOrganizationFailure(err, status) {
  return {
    type: types.ADD_DASHBOARD_TO_ORGANIZATION_FAILURE,
    err,
    status
  }
}
// Remove Dashboard
// ----------------
function removeDashboardFromOrganizationRequest(organizationId, dashboardId) {
  return {
    type: types.REMOVE_DASHBOARD_FROM_ORGANIZATION_REQUEST,
    organizationId,
    dashboardId
  }
}
function removeDashboardFromOrganizationSuccess(organization) {
  return {
    type: types.REMOVE_DASHBOARD_FROM_ORGANIZATION_SUCCESS,
    organization
  }
}
function removeDashboardFromOrganizationFailure(err, status) {
  return {
    type: types.REMOVE_DASHBOARD_FROM_ORGANIZATION_FAILURE,
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
      location.reload()
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
// Add Dashboard
// -------------
export function addDashboardToOrganization(organizationId, dashboardId) {
  return (dispatch) => {
    dispatch(addDashboardToOrganizationRequest(organizationId, dashboardId))
    return request('post', { organizationId, dashboardId }, `${apiEndpoint}/add/dashboard`)
    .then(res => {
      const { organization } = res
      dispatch(addDashboardToOrganizationSuccess(organization))
    })
    .catch(err => {
      dispatch(addDashboardToOrganizationFailure(err, err.status))
    })
  }
}
// Remove Dashboard
// ----------------
export function removeDashboardFromOrganization(organizationId, dashboardId) {
  return (dispatch) => {
    dispatch(removeDashboardFromOrganizationRequest(organizationId, dashboardId))
    return request('post', { organizationId, dashboardId }, `${apiEndpoint}/remove/dashboard`)
    .then(res => {
      const { organization } = res
      dispatch(removeDashboardFromOrganizationSuccess(organization))
    })
    .catch(err => {
      dispatch(removeDashboardFromOrganizationFailure(err, err.status))
    })
  }
}
// Update Organization
// -------------------
export function updateOrganization(organization) {
  return {
    type: types.UPDATE_ORGANIZATION,
    organization
  }
}

