import { combineReducers } from 'redux'
import { routeReducer as routing } from 'react-router-redux'

import dashboards from './dashboards'
import lists from './lists'
import resources from './resources'
import inputTypes from './inputTypes'
import users from './users'
import organization from './organization'

export default combineReducers({
  dashboards,
  lists,
  resources,
  inputTypes,
  users,
  organization,
  routing
})
