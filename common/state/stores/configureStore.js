import { compose,
         createStore,
         applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { syncHistory } from 'redux-simple-router'
import { browserHistory } from 'react-router'
// import persistState,
     // { mergePersistedState } from 'redux-localstorage'
// import adapter from 'redux-localstorage/lib/adapters/localStorage'
// import filter from 'redux-localstorage-filter'
// import debounce from 'redux-localstorage-debounce'
// import _ from 'lodash'
// import merge from 'lodash.merge'

import { DevTools } from '../../views'
import anchorApp from '../reducers'
import { authenticationRouter } from '../middleware'

// Init
// ====
let rootReducer
let storage
let createStoreWithMiddleware
let middleware
export let reduxRouterMiddleware

// Build createStoreWithMiddleware
// ===============================
// Client
// ------
if (typeof window !== 'undefined') {
  reduxRouterMiddleware = syncHistory(browserHistory)
  middleware = [
    thunk,
    authenticationRouter,
    reduxRouterMiddleware
  ]
  // rootReducer = getPersistedState(anchorApp)
  rootReducer = anchorApp
  // storage = configClientStorage()
  createStoreWithMiddleware = compose(
    applyMiddleware(...middleware),
    // persistState(storage, 'UID-1337'),
    DevTools.instrument(),
  )(createStore)
// Server
// ------
} else {
  middleware = [
    thunk,
    authenticationRouter
  ]
  rootReducer = anchorApp
  createStoreWithMiddleware = compose(
    applyMiddleware(...middleware),
    DevTools.instrument(),
  )(createStore)
}

// Export store creator
// ====================
export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState)
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers')
      store.replaceReducer(nextReducer)
    })
  }
  return store
}

// Configure localStorage
// ======================
// function getPersistedState(reducer) {
//   return compose(
//     mergePersistedState((initialState, persistedState) => {
//       return initialState
//       // initialState['dashboards']['currentDashboard'] = persistedState['dashboards']['currentDashboard'] || ''
//       // initialState['lists']['currentList'] = persistedState['lists']['currentList'] || ''
//       // initialState['users']['user'] = persistedState['users']['user'] || {}
//       // return initialState
//       // _.merge({}, initialState, persistedState)
//     })
//   )(reducer)
// }

// function configClientStorage() {
//   return compose(
//     debounce(500),
//     filter([
//       'dashboards.currentDashboard',
//       'lists.currentList',
//       'users.user'
//     ])
//   )(adapter(localStorage))
// }
