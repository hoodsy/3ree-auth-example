import { combineReducers } from 'redux';
import { lists } from './list';

export * from './list';
export * from './resource';

const anchorApp = combineReducers({
  lists,
});

export default anchorApp;
