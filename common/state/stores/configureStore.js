import { compose, createStore, applyMiddleware } from 'redux'
import { devTools } from 'redux-devtools'
import thunk from 'redux-thunk'
import persistState, { mergePersistedState } from 'redux-localstorage'
import adapter from 'redux-localstorage/lib/adapters/localStorage'
import filter from 'redux-localstorage-filter'
import debounce from 'redux-localstorage-debounce'
import _ from 'lodash'

import anchorApp from '../reducers'
import { authenticationRouter } from '../middleware'

// Init
// ====
const rootReducer = getPersistedState()
const storage = configLocalStorage()
const createStoreWithMiddleware = compose(
  applyMiddleware(thunk, authenticationRouter),
  persistState(storage, 'UID-1337'),
  devTools(),
)(createStore)

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
function getPersistedState() {
  return compose(
    mergePersistedState((initialState, persistedState) =>
      _.merge({}, initialState, persistedState)
    )
  )(anchorApp)
}

function configLocalStorage() {
  const localStorage = (typeof window !== 'undefined')
    ? window.localStorage
    : undefined
  return compose(
    debounce(500),
    filter([
      'dashboards.currentDashboard',
      'lists.currentList'
    ])
  )(adapter(localStorage))
}
