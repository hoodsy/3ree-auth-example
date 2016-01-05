import { combineReducers } from 'redux';
import * as types from '../../constants/actionTypes';
import { lists } from './list';

function id(state = '1', action) {
  return state;
}

// function title(state = 'Strategic Synergy Syndicate', action) {
//   return state;
// }

// Dashboards
// ==========
export function title(state = {}, action) {
  switch (action.type) {
    case types.ADD_DASHBOARD_REQUEST:
      return [
        ...state,
      ];

    case types.ADD_DASHBOARD_SUCCESS:
      return [
        ...state,
        action.dashboard,
      ];

    case types.ADD_DASHBOARD_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error,
      });

    default:
      return state;
  }
}

// const dashboard = combineReducers({
//   // id,
//   title,
//   // dashboards,
//   lists,
// });
const dashboard = combineReducers(Object.assign({}, dashboard, lists));

export default dashboard;
