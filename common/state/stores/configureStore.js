import { compose,
         createStore,
         applyMiddleware } from 'redux'
import { devTools } from 'redux-devtools'
import thunk from 'redux-thunk'
import { syncHistory } from 'redux-simple-router'
import { browserHistory } from 'react-router'
import persistState,
     { mergePersistedState } from 'redux-localstorage'
import adapter from 'redux-localstorage/lib/adapters/localStorage'
import filter from 'redux-localstorage-filter'
import debounce from 'redux-localstorage-debounce'
import _ from 'lodash'

import anchorApp from '../reducers'
import { authenticationRouter } from '../middleware'

// Init
// ====
let rootReducer
let storage
let createStoreWithMiddleware
let middleware
export let reduxRouterMiddleware

if (typeof window !== 'undefined') {
  reduxRouterMiddleware = syncHistory(browserHistory)
  middleware = [
    thunk,
    authenticationRouter,
    reduxRouterMiddleware
  ]
} else {
  middleware = [
    thunk,
    authenticationRouter
  ]
}

// Build createStoreWithMiddleware
// ===============================
if (typeof window !== 'undefined') {
  // Client store config (include localStorage)
  rootReducer = getPersistedState(anchorApp)
  storage = configClientStorage()
  createStoreWithMiddleware = compose(
    applyMiddleware(...middleware),
    persistState(storage, 'UID-1337'),
    devTools(),
  )(createStore)
} else {
  // Server store config
  rootReducer = anchorApp
  createStoreWithMiddleware = compose(
    applyMiddleware(...middleware),
    devTools(),
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
function getPersistedState(reducer) {
  return compose(
    mergePersistedState((initialState, persistedState) =>
      _.merge({}, initialState, persistedState)
    )
  )(reducer)
}

function configClientStorage() {
  return compose(
    debounce(500),
    filter([
      'dashboards.currentDashboard',
      'lists.currentList'
    ])
  )(adapter(localStorage))
}
