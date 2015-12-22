import { combineReducers } from 'redux';
// import undoable, { distinctState } from 'redux-undo';
import * as types from '../constants/actionTypes';

// Todos
// =====
function todo(state = [], action) {
  switch (action.type) {
    case types.ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          listIndex: action.listIndex,
          completed: false,
        },
      ];

    case types.COMPLETE_TODO:
      return [
        ...state.slice(0, action.index),
        Object.assign({}, state[action.index], {
          completed: true,
        }),
        ...state.slice(action.index + 1),
      ];

    default:
      return state;
  }
}

// Lists
// =====
function lists(state = [], action) {
  console.log(state);
  console.log('-----');
  console.log(action);
  console.log('=======');
  console.log('=======');
  switch (action.type) {
    case types.ADD_LIST_REQUEST:
      // return Object.assign({}, state, {
      //   isFetching: true,
      //   error: null
      // });
      return [
        ...state
      ];

    case types.ADD_LIST_SUCCESS:
      // const lists = state.lists;
      // return Object.assign({}, state, {
      //   isFetching: false,
      //   error: null,
      //   lists
      // });
      return [
        ...state,
        action.list
      ];

    case types.ADD_TODO:
      return [
        ...state.slice(0, action.listIndex),
        {
          text: state[action.listIndex].text,
          todos: todo(state[action.listIndex].todos, action),
        },
        ...state.slice(action.listIndex + 1),
      ];

    case types.COMPLETE_TODO:
      return [
        ...state.slice(0, action.listIndex),
        {
          text: state[action.listIndex].text,
          todos: todo(state[action.listIndex].todos, action),
        },
        ...state.slice(action.listIndex + 1),
      ];

    case types.ADD_LIST_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error,
      });

    default:
      return state;
  }
}

const anchorApp = combineReducers({
  lists,
});

export default anchorApp;
