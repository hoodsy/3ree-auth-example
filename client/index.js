import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { DevTools,
         DebugPanel,
         LogMonitor } from 'redux-devtools/lib/react'

import { App } from '../common/views'
// import anchorApp from '../common/state/reducers'
// import startSocketListener from './socketListener'
import { rootReducer, configureStore } from '../common/state/stores/configureStore'

const initialState = window.__INITIAL_STATE__
const store = configureStore(rootReducer, initialState)
const rootElement = document.getElementById('root')
render(
  <div>
    <Provider store={store}>
      <App />
    </Provider>
    <DebugPanel top right bottom>
      <DevTools store={store} monitor={LogMonitor} />
    </DebugPanel>
  </div>,
  rootElement
)

// startSocketListener(store, actions)
