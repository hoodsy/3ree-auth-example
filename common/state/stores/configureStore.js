import { compose,
         createStore,
         applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { syncHistory } from 'redux-simple-router'
import { browserHistory } from 'react-router'
import persistState,
     { mergePersistedState } from 'redux-localstorage'
import adapter from 'redux-localstorage/lib/adapters/localStorage'
import filter from 'redux-localstorage-filter'
import debounce from 'redux-localstorage-debounce'
// import merge from 'lodash/lang/merge'
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
if (typeof window !== 'undefined') {
  // Client middleware
  reduxRouterMiddleware = syncHistory(browserHistory)
  middleware = [
    thunk,
    authenticationRouter,
    reduxRouterMiddleware
  ]
  // Client store config (include localStorage)
  rootReducer = getPersistedState(anchorApp)
  storage = configClientStorage()
  createStoreWithMiddleware = compose(
    applyMiddleware(...middleware),
    persistState(storage, 'UID-1337'),
    DevTools.instrument(),
  )(createStore)

} else {
  // Server middleware
  middleware = [
    thunk,
    authenticationRouter
  ]
  // Server store config
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
function getPersistedState(reducer) {
  return compose(
    mergePersistedState((initialState, persistedState) => {
      return initialState
      // merge({}, initialState, persistedState)
      // if (Object.keys(persistedState).length !== 0) {
      //   const { currentDashboard } = persistedState.dashboards
      //   const { currentList } = persistedState.lists
      //   if (currentDashboard)
      //     initialState.dashboards.currentDashboard = currentDashboard
      //   if (currentList)
      //     initialState.dashboards.currentList = currentList
      // }
      // return initialState
    })
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
