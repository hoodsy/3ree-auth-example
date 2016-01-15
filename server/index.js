import React from 'react'
import { renderToString } from 'react-dom/server'
import { RouterContext, match } from 'react-router'
import { Provider } from 'react-redux'
import { DevTools,
         DebugPanel,
         LogMonitor } from 'redux-devtools/lib/react'

import routes from '../common/views/routes'
import { getDashboardData } from './api/service'
import configureStore from '../common/state/stores/configureStore'

export default function initialRender(req, res) {
  match({ routes, location: req.url },
  (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      getDashboardData()
       .then(data => {

        // Initial Data
        // ============
         const store = initializeStore(data)
         const initialState = store.getState()

         // Initial Render
         // ==============
         const html = renderToString(
           <div>
             <Provider store={store}>
               <RouterContext {...renderProps}>
               </RouterContext>
             </Provider>
             <DebugPanel top right bottom>
               <DevTools store={store} monitor={LogMonitor} />
             </DebugPanel>
           </div>
         )
         const renderedTemplate = renderTemplate(html, initialState)
         res.status(200).send(renderedTemplate)
       })
    } else {
      res.status(404).send('Not Found')
    }

  })
}

function initializeStore(data) {
  return configureStore({
    dashboards: {
      dashboardsById: data.dashboardsById,
      currentDashboard: '',
      isFetching: false
    },
    lists: {
      listsById: data.listsById,
      currentList: '',
      isFetching: false
    },
    resources: {
      resourcesById: data.resourcesById,
      isFetching: false
    }
  })
}

function renderTemplate(html, initialState) {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <title>Anchor</title>
    </head>
    <body>
      <div id="root">${html}</div>
      <script>window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}</script>
      <script src="/static/bundle.js"></script>
    </body>
  </html>
  `
}
