import { combineReducers } from 'redux';
// import * as types from '../../constants/actionTypes';
import { lists } from './list';

function id(state = '1', action) {
  return state;
}

function title(state = 'Strategic Synergy Syndicate', action) {
  return state;
}

const dashboard = combineReducers({
  id,
  title,
  lists,
});

export default dashboard;
