import { combineReducers } from 'redux'

// import user from './user'
import dashboards from './dashboard/dashboards'
import inputTypes from './inputTypes'
import lists from './lists'

const anchorApp = combineReducers({
  // user,
  dashboards,
  lists,
  inputTypes
})

// Exports
// =======
export * from './lists'
// export * from './dashboard/resource'
export * from './dashboard/dashboards'
export * from './inputTypes'
export default anchorApp
