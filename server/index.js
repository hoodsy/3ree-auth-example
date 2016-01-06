import React from 'react'
import { renderToString } from 'react-dom/server'

import { Provider } from 'react-redux'
import { DevTools,
         DebugPanel,
         LogMonitor } from 'redux-devtools/lib/react'

import { Dashboard } from '../common/views'
import { getLists,
         getListResources } from './api/service'
import anchorApp from '../common/state/reducers'
import configureStore from '../common/state/stores/configureStore'

export default function initialRender(req, res) {
  getLists()
  .then(lists => getListResources(lists)) // Fill Lists with their resources
  .then(lists => {
    // const initialState = { dashboard: { title: 'Strategic Synergy Syndicate', lists } }
    const initialState = {
      dashboards: {
        byId: {},
        current: '',
        isFetching: false
      }
    }
    const store = configureStore(anchorApp, initialState)

    // Render the component to a string
    const html = renderToString(
      <div>
        <Provider store={store}>
          <Dashboard />
        </Provider>
        <DebugPanel top right bottom>
          <DevTools store={store} monitor={LogMonitor} />
        </DebugPanel>
      </div>
    )

    // Send the rendered page back to the client with the initial state
    res.render('index',
      {
        initialState: JSON.stringify(store.getState()),
        html
      }
    )
  })
}
