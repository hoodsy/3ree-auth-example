import * as types from '../constants/actionTypes';
import request from 'superagent/lib/client';

// API Endpoint
// ============
const apiEndpoint = '/api';

// Resources
// =====
export function addResourceRequest(text) {
  return {
    type: types.ADD_RESOURCE_REQUEST,
    text,
  };
}

export function addResourceSuccess(resource) {
  return {
    type: types.ADD_RESOURCE_SUCCESS,
    resource,
  };
}

export function addResourceFailure(error) {
  return {
    type: types.ADD_RESOURCE_FAILURE,
    error,
  };
}

export function addResource(listId, text) {
  console.log(`in addResource with ${listId} - ${text}`);
  return (dispatch) => {
    dispatch(addResourceRequest(text));

    return request
      .post(`${apiEndpoint}/resource`)
      .send({ listId, text })
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          dispatch(addResourceFailure(err));
          console.log(`FAILED RESPONSE: ${err}`);
        } else {
          dispatch(addResourceSuccess(res.body));
          console.log(`SUCESSFUL RESPONSE: ${res}`);
        }
      });
  };
}

export function completeResource(listIndex, index) {
  return {
    type: types.COMPLETE_RESOURCE,
    listIndex,
    index,
  };
}

// Lists
// =====
export function addListRequest(text) {
  return {
    type: types.ADD_LIST_REQUEST,
    text,
  };
}

export function addListSuccess(list) {
  return {
    type: types.ADD_LIST_SUCCESS,
    list,
  };
}

export function addListFailure(error) {
  return {
    type: types.ADD_LIST_FAILURE,
    error,
  };
}

export function addList(text) {
  return (dispatch) => {
    dispatch(addListRequest(text));

    return request
      .post(`${apiEndpoint}/list`)
      .send({ text })
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          dispatch(addListFailure(err, text));
        } else {
          dispatch(addListSuccess(res.body));
        }
      });
  };
}
