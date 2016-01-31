import xss from 'xss'
import r from 'rethinkdb'
import _ from 'lodash'

import config from '../config/rethinkDb/dbConfig'
import { extractByType,
         merge,
         normalize,
         extractIds } from './util'
import { getDashboardLists,
         deleteDashboardLists } from './lists'
import { deleteListResources } from './resources'

// Create Dashboard
// =============
export function createDashboard(conn, dashboard) {
  dashboard.created = new Date().toString()
  dashboard.title = xss(dashboard.title)
  return r
  .table('dashboards')
  .insert(dashboard)
  .run(conn)
  .then(response => {
    return Object.assign({}, dashboard, { id: response.generated_keys[0] })
  })
}

// Delete Dashboard
// ================
export function deleteDashboard(conn, dashboard) {
  return r
  .table('dashboards')
  .get(dashboard['id'])
  .delete()
  .run(conn)
}

// Delete Dashboard Data
// =====================
export function deleteDashboardData(conn, dashboard) {
  deleteDashboard(conn, dashboard)
  .error(err => err)
  getDashboardLists(conn, dashboard)
  .then(cursor => cursor.toArray())
  .then(lists => extractIds(lists))
  .then(listIds => {
    deleteListResources(conn, listIds)
    .error(err => err)
  })
  return deleteDashboardLists(conn, dashboard)
}


// Get Dashboard w/ Data
// =====================
export function getDashboardData(dashboards) {
  if (!dashboards)
    return new Promise((resolve) => resolve({}))

  return r.connect(config)
  .then(conn => {
    return r.table('dashboards')
    .getAll(...dashboards)
    .map(dashboard => {
      const lists = r.table('lists')
      .getAll(dashboard('id'), { index: 'dashboardId' })
      .coerceTo('array')
      .map(list => {
        const resources = r.table('resources')
        .getAll(list('id'), { index: 'listId' })
        .coerceTo('array')
        return { list, resources }
      })
      return { dashboard, lists }
    })
    .run(conn)
    .then(formatDashboardData)
    .error((err) => { err })
  })
}

// Utility
// =======
function formatDashboardData(cursor) {
  return (
    cursor.toArray()
    .map(item => {
      const {
        lists,
        resources
      } = extractByType(item.lists)
      return {
        dashboards: item.dashboard,
        lists,
        resources
      }
    })
    .then(cursor => merge(cursor))
    .then(cursor => ({
      dashboardsById: normalize(cursor['dashboards']),
      listsById: normalize(cursor['lists']),
      resourcesById: normalize(cursor['resources'])
    }))
  )
}
