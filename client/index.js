import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router,
         browserHistory } from 'react-router'

import { DevTools } from '../common/views'
import createRoutes from '../common/views/routes'
import configureStore,
     { reduxRouterMiddleware } from '../common/state/stores/configureStore'
import startSocketListener from './socketListener'

// Init Store
// ==========
const initialState = window.__INITIAL_STATE__
const store = configureStore(initialState)

// Init Router
// ===========
reduxRouterMiddleware.listenForReplays(store)
const routes = createRoutes(store)

render(
  <div>
    <Provider store={ store }>
      <div>
        <Router history={ browserHistory }>
          { routes }
        </Router>
        <DevTools />
      </div>
    </Provider>
  </div>,
  document.getElementById('root')
)

startSocketListener(store)
