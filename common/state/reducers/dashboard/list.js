import { resources } from './resource';
import * as types from '../../constants/actionTypes';

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
      /* eslint-disable */
      const list = state.filter(list => list.id === listId)[0];
      const listIndex = state.map(list => list.id).indexOf(listId);
      /* eslint-enable */

      return [
        ...state.slice(0, listIndex),
        {
          title: list.title,
          resources: resources(list.resources, action),
        },
        ...state.slice(listIndex + 1),
      ];

    case types.COMPLETE_RESOURCE:
      return [
        ...state.slice(0, action.listIndex),
        {
          title: state[action.listIndex].title,
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
