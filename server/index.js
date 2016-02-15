import React from 'react'
import { renderToString } from 'react-dom/server'
import { RouterContext, match } from 'react-router'
import { Provider } from 'react-redux'
import _ from 'lodash'

import { DevTools } from '../common/views/index'
import createRoutes from '../common/views/routes'
import { getOrganizationData } from './api/organizations'
import configureStore from '../common/state/stores/configureStore'

export default function initialRender(req, res) {
  const organizationId  = (req['user'] && req['user']['organizationId'])
    ? req['user']['organizationId']
    : null

  getOrganizationData(req.dbConn, organizationId)
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

function initializeStore(data, user = {}) {
  const currentDashboard = (_.keys(data['dashboardsById']).length)
    ? _.keys(data['dashboardsById'])[0]
    : ''
  const isAuthenticated = (user['id']) ? true : false
  if (isAuthenticated)
    addCurrentUser(data['usersById'], user)

  return configureStore({
    dashboards: {
      dashboardsById: data['dashboardsById'] || {},
      currentDashboard,
      isFetching: false
    },
    lists: {
      listsById: data['listsById'] || {} ,
      currentList: '',
      isFetching: false
    },
    resources: {
      resourcesById: data['resourcesById'] || {} ,
      isFetching: false
    },
    users: {
      usersById: data['usersById'] || {},
      currentUser: user['id'] || '',
      isAuthenticated,
      isFetching: false
    },
    organization: data['organization'] || {}
  })
}

function addCurrentUser(usersById, user) {
  usersById[user['id']] = {
    id: user['id'],
    name: user['name'],
    email: user['email'],
    picture: user['picture'],
    organizationId: user['organizationId']
  }
  return usersById
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
