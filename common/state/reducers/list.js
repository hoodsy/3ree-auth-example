import { resources } from './resource';
import * as types from '../constants/actionTypes';

// Lists
// =====
export function lists(state = [], action) {
  switch (action.type) {
    case types.ADD_LIST_REQUEST:
      // return Object.assign({}, state, {
      //   isFetching: true,
      //   error: null
      // });
      return [
        ...state,
      ];

    case types.ADD_LIST_SUCCESS:
      return [
        ...state,
        action.list,
      ];

    case types.ADD_RESOURCE_SUCCESS:
      const { listId } = action.resource;
      const list = state.filter(list => list.id === listId)[0];
      const listIndex = state.map(list => list.id).indexOf(listId);
      return [
        ...state.slice(0, listIndex),
        {
          text: list.text,
          resources: resources(list.resources, action),
        },
        ...state.slice(listIndex + 1),
      ];

    case types.COMPLETE_RESOURCE:
      return [
        ...state.slice(0, action.listIndex),
        {
          text: state[action.listIndex].text,
          resources: resources(state[action.listIndex].resources, action),
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
