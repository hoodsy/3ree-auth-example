import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from '../common/views/containers/App'
import todoApp from '../common/state/reducers/reducers'
import configureStore from '../common/state/stores/configureStore'
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react'

const store = configureStore(todoApp)
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
