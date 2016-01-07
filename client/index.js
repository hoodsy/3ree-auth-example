import React from 'react'
import { render } from 'react-dom'

import { Provider } from 'react-redux'
import { DevTools,
         DebugPanel,
         LogMonitor } from 'redux-devtools/lib/react'
// import { createStore } from 'redux'

import { Dashboard } from '../common/views'
// import startSocketListener from './socketListener'
import anchorApp from '../common/state/reducers'
// import * as actions from '../common/state/actions'
import configureStore from '../common/state/stores/configureStore'

const initialState = window.__INITIAL_STATE__
const store = configureStore(anchorApp, initialState)
const rootElement = document.getElementById('root')
render(
  <div>
    <Provider store={store}>
      <Dashboard />
    </Provider>
    <DebugPanel top right bottom>
      <DevTools store={store} monitor={LogMonitor} />
    </DebugPanel>
  </div>,
  rootElement
)

// startSocketListener(store, actions)
