import { compose, createStore, applyMiddleware } from 'redux'
import { devTools } from 'redux-devtools'
import thunk from 'redux-thunk'
import persistState, { mergePersistedState } from 'redux-localstorage'
import adapter from 'redux-localstorage/lib/adapters/localStorage'
import filter from 'redux-localstorage-filter'

import anchorApp from '../reducers'

export const rootReducer = compose(
  mergePersistedState()
)(anchorApp)

const isBrowser = typeof window !== 'undefined'
const target = isBrowser ? window.localStorage : ''
const storage = compose(
  filter('dashboards.currentDashboard')
)(adapter(target))

export const configureStore = compose(
  applyMiddleware(thunk),
  devTools(),
  persistState(storage, 'dashboards.currentDashboard'),
)(createStore)
