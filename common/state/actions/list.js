import request from './util/request'
import * as types from '../constants/actionTypes'

// API Endpoint
// ============
const apiEndpoint = '/api/list'

// Private Actions
// ===============
function addListRequest(title) {
  return {
    type: types.ADD_LIST_REQUEST,
    title
  }
}

function addListSuccess(list) {
  return {
    type: types.ADD_LIST_SUCCESS,
    list
  }
}

function addListFailure(err, status) {
  return {
    type: types.ADD_LIST_FAILURE,
    err,
    status
  }
}

// Public Actions
// ==============
export function addList(dashboardId, title) {
  return (dispatch) => {
    dispatch(addListRequest(title))
    return request('post', { dashboardId, title }, apiEndpoint)
    .then(res => {
      dispatch(addListSuccess(res))
    })
    .catch(err => {
      dispatch(addListFailure(err, err.status))
    })
  }
}

export function setCurrentList(listId) {
  return {
    type: types.SET_CURRENT_LIST,
    listId
  }
}
