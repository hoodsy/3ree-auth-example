import * as types from '../constants/actionTypes';
import request from 'superagent/lib/client';

// API Endpoint
// ============
const apiEndpoint = '/api/resource';

// Resources
// =====
export function addResourceRequest(url) {
  return {
    type: types.ADD_RESOURCE_REQUEST,
    url,
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

export function addResource(listId, url) {
  return (dispatch) => {
    dispatch(addResourceRequest(url));

    return request
      .post(apiEndpoint)
      .send({ listId, url })
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
