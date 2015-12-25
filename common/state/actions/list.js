import * as types from '../constants/actionTypes';
import request from 'superagent/lib/client';

// API Endpoint
// ============
const apiEndpoint = '/api/list';

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
      .post(apiEndpoint)
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
