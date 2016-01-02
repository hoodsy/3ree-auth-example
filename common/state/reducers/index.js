import { combineReducers } from 'redux';
import user from './user';
import dashboard from './dashboard/dashboard';
import status from './status';

const anchorApp = combineReducers({
  user,
  dashboard,
  status,
});

// Exports
// =======
export * from './dashboard/list';
export * from './dashboard/resource';
export default anchorApp;
