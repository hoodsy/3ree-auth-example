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
          url: action.url,
          completed: false,
        },
      ];

    default:
      return state;
  }
}
