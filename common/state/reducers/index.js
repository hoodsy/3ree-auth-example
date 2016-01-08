import { combineReducers } from 'redux'

import dashboards from './dashboards'
import lists from './lists'
import resources from './resources'
import inputTypes from './inputTypes'

const anchorApp = combineReducers({
  dashboards,
  lists,
  resources,
  inputTypes
})

// Exports
// =======
export * from './dashboards'
export * from './lists'
export * from './resources'
export * from './inputTypes'
export default anchorApp
