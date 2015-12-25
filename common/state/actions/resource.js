import * as types from '../constants/actionTypes';
import request from 'superagent/lib/client';

// API Endpoint
// ============
const apiEndpoint = '/api/resource';

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
  return (dispatch) => {
    dispatch(addResourceRequest(text));

    return request
      .post(apiEndpoint)
      .send({ listId, text })
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          dispatch(addResourceFailure(err));
        } else {
          dispatch(addResourceSuccess(res.body));
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
