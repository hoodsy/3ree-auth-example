import request from './util/request'
import * as types from '../constants/actionTypes'

// API Endpoint
// ============
const apiEndpoint = '/api/list'

// Private Actions
// ===============
function createListRequest(title) {
  return {
    type: types.CREATE_LIST_REQUEST,
    title
  }
}

function createListSuccess(list) {
  return {
    type: types.CREATE_LIST_SUCCESS,
    list
  }
}

function createListFailure(err, status) {
  return {
    type: types.CREATE_LIST_FAILURE,
    err,
    status
  }
}

// Public Actions
// ==============
export function createList(dashboardId, title) {
  return (dispatch) => {
    dispatch(createListRequest(title))
    return request('post', { dashboardId, title }, apiEndpoint)
    .then(res => {
      dispatch(createListSuccess(res))
    })
    .catch(err => {
      dispatch(createListFailure(err, err.status))
    })
  }
}

export function setCurrentList(listId) {
  return {
    type: types.SET_CURRENT_LIST,
    listId
  }
}
