import { compose,
         createStore,
         applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { syncHistory } from 'react-router-redux'
import { browserHistory } from 'react-router'
import { DevTools } from '../../views'
import anchorApp from '../reducers'
import { authenticationRouter } from '../middleware'

// Init
// ====
let rootReducer
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
  rootReducer = anchorApp
  createStoreWithMiddleware = compose(
    applyMiddleware(...middleware),
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
  if (module.hot) module.hot.accept()
  return store
}
