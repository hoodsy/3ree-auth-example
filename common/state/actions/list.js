import * as types from '../constants/actionTypes'
import request from 'superagent/lib/client'

// API Endpoint
// ============
const apiEndpoint = '/api/list'

// Lists
// =====
export function addListRequest(title) {
  return {
    type: types.ADD_LIST_REQUEST,
    title
  }
}

export function addListSuccess(list) {
  return {
    type: types.ADD_LIST_SUCCESS,
    list
  }
}

export function addListFailure(error) {
  return {
    type: types.ADD_LIST_FAILURE,
    error
  }
}

export function addList(dashboardId, title) {
  return (dispatch) => {
    dispatch(addListRequest(title))

    return request
      .post(apiEndpoint)
      .send({ dashboardId, title })
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          dispatch(addListFailure(err, title))
        } else {
          dispatch(addListSuccess(res.body))
        }
      })
  }
}

export function setCurrentList(listId) {
  return {
    type: types.SET_CURRENT_LIST,
    listId
  }
}
