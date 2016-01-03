// import { combineReducers } from 'redux';
// import * as types from '../../constants/actionTypes';

function status(state = {}, action) {
  return { isFetching: false, error: '' };
}

export default status;
