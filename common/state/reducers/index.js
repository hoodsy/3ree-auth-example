import { combineReducers } from 'redux'
// import user from './user'
import dashboards from './dashboard/dashboards'
// import status from './status'

const anchorApp = combineReducers({
  // user,
  dashboards
  // status
})

// Exports
// =======
// export * from './dashboard/list'
// export * from './dashboard/resource'
export * from './dashboard/dashboards'
export default anchorApp
