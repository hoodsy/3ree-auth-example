import * as types from '../../constants/actionTypes';

// Resources
// =====
export function resources(state = [], action) {
  switch (action.type) {
    case types.ADD_RESOURCE_REQUEST:
      return [
        ...state,
      ];

    case types.ADD_RESOURCE_SUCCESS:
      return [
        ...state,
        action.resource,
      ];

    case types.ADD_RESOURCE:
      return [
        ...state,
        {
          text: action.text,
          listIndex: action.listIndex,
          completed: false,
        },
      ];

    case types.COMPLETE_RESOURCE:
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
