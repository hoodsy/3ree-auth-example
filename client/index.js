import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import { DevTools,
         DebugPanel,
         LogMonitor } from 'redux-devtools/lib/react'
import { syncReduxAndRouter } from 'redux-simple-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'

import routes from '../common/state/routes'
// import startSocketListener from './socketListener'
import configureStore from '../common/state/stores/configureStore'

// Init Store
// ==========
const initialState = window.__INITIAL_STATE__
const store = configureStore(initialState)
// Init Router
// ===========
const history = createBrowserHistory()
syncReduxAndRouter(history, store)
render(
  <div>
    <Provider store={store}>
      <Router history={history}>
        {routes}
      </Router>
    </Provider>
    <DebugPanel top right bottom>
      <DevTools store={store} monitor={LogMonitor} />
    </DebugPanel>
  </div>,
  document.getElementById('root')
)

// startSocketListener(store, actions)
