import { combineReducers } from 'redux'
import { routeReducer as routing } from 'redux-simple-router'

import dashboards from './dashboards'
import lists from './lists'
import resources from './resources'
import inputTypes from './inputTypes'
import users from './users'

export default combineReducers({
  dashboards,
  lists,
  resources,
  inputTypes,
  users,
  routing
})
