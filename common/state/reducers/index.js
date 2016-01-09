import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'

import dashboards from './dashboards'
import lists from './lists'
import resources from './resources'
import inputTypes from './inputTypes'

export default combineReducers({
  routeReducer,
  dashboards,
  lists,
  resources,
  inputTypes
})
