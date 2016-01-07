import { combineReducers } from 'redux'
// import user from './user'
import dashboards from './dashboard/dashboards'
import globalInput from './globalInput'
// import status from './status'

const anchorApp = combineReducers({
  // user,
  dashboards,
  globalInput
  // status
})

// Exports
// =======
// export * from './dashboard/list'
// export * from './dashboard/resource'
export * from './dashboard/dashboards'
export * from './globalInput'
export default anchorApp
