import * as types from '../constants/actionTypes';
import request from 'superagent/lib/client';


// API Endpoint
// ============
const apiEndpoint = '/api';

// Todos
// =====
export function addTodo(text, listIndex) {
  return {
    type: types.ADD_TODO,
    listIndex,
    text,
  };
}

export function completeTodo(listIndex, index) {
  return {
    type: types.COMPLETE_TODO,
    listIndex,
    index
  };
}

// Lists
// =====
export function addList (text) {
  return (dispatch) => {
    dispatch(addListRequest(text))
    console.log(`dispatched addListRequest`);

    return request
      .post(`${apiEndpoint}/list/1`)
      .send({ text })
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          dispatch(addListFailure(err, text));
          console.log(`FAILED RESPONSE: ${err}`);
        } else {
          dispatch(addListSuccess(res.body));
          console.log(`SUCESSFUL RESPONSE: ${res}`);
        }
      });
  }
}

export function addListRequest (text) {
  return {
    type: types.ADD_LIST_REQUEST,
    text
  };
}

export function addListSuccess (list) {
  return {
    type: types.ADD_LIST_SUCCESS,
    list
  };
}

export function addListFailure (text) {
  return {
    type: types.ADD_LIST_FAILURE,
    text
  };
}
