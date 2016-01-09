import { compose, createStore, applyMiddleware } from 'redux'
import { devTools } from 'redux-devtools'
import thunk from 'redux-thunk'
import persistState, { mergePersistedState } from 'redux-localstorage'
import adapter from 'redux-localstorage/lib/adapters/localStorage'
import filter from 'redux-localstorage-filter'
import _ from 'lodash'

import anchorApp from '../reducers'

export const rootReducer = compose(
  mergePersistedState((initialState, persistedState) =>
    _.merge({}, initialState, persistedState)
  )
)(anchorApp)

const isBrowser = typeof window !== 'undefined'
const target = isBrowser ? window.localStorage : ''
const storage = compose(
  filter([
    'dashboards.currentDashboard',
    'lists.currentList'
  ])
)(adapter(target))

export const configureStore = compose(
  applyMiddleware(thunk),
  persistState(storage, 'UID-1337'),
  devTools(),
)(createStore)
