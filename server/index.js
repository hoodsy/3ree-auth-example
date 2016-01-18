import React from 'react'
import { renderToString } from 'react-dom/server'
import { RouterContext, match } from 'react-router'
import { Provider } from 'react-redux'

import { DevTools } from '../common/views/index'
import routes from '../common/views/routes'
import { getDashboardData } from './api/dashboards'
import configureStore from '../common/state/stores/configureStore'

export default function initialRender(req, res) {
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      getDashboardData()
      .then(data => {

      // Initial Data
      // ============
        const store = initializeStore(data, req.user)
        const initialState = store.getState()

        // Initial Render
        // ==============
        const html = renderToString(
          <div>
            <Provider store={store}>
              <div>
               <RouterContext {...renderProps} />
               <DevTools />
              </div>
            </Provider>
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

function initializeStore(data, user = {}) {
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
    },
    users: {
      user: {
        name: user.name,
        email: user.email,
        picture: user.picture
      },
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
