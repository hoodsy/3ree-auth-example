import React from 'react'
import { renderToString } from 'react-dom/server'
import { RouterContext, match } from 'react-router'
import { Provider } from 'react-redux'

import { DevTools } from '../common/views/index'
// import routes from '../common/views/routes'
import createRoutes from '../common/views/routes'
import { getDashboardData } from './api/dashboards'
import configureStore from '../common/state/stores/configureStore'

export default function initialRender(req, res) {
  // const dashboards  = (req['user']) ? req['user']['dashboards'] : 'b838af6f-baaa-471b-8a16-f7203df44562'
  const dashboards  = (req['user'] && req['user']['dashboards'].length)
    ? req['user']['dashboards']
    : null
  getDashboardData(dashboards)
  .then(data => {

    // Initial Data
    // ============
    const store = initializeStore(data, req.user)
    const initialState = store.getState()
    const routes = createRoutes(store)

    // Initial Router Config
    // =====================
    match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
      if (error) {
        res.status(500).send(error.message)
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search)
      } else if (renderProps) {
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
      } else {
        res.status(404).send('Not Found')
      }
    })
  })
}

function initializeStore(data = {}, user = {}) {
  const isAuthenticated = (user.id) ? true : false
  return configureStore({
    dashboards: {
      dashboardsById: data.dashboardsById || {},
      currentDashboard: '',
      isFetching: false
    },
    lists: {
      listsById: data.listsById  || {},
      currentList: '',
      isFetching: false
    },
    resources: {
      resourcesById: data.resourcesById  || {},
      isFetching: false
    },
    users: {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        dashboards: user.dashboards,
        isAuthenticated
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
