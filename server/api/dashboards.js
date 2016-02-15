import xss from 'xss'
import r from 'rethinkdb'

import { extractByType,
         merge,
         normalize,
         extractIds,
         SOFT_DURABILITY } from './util'
import { getDashboardLists,
         deleteDashboardLists } from './lists'
import { deleteListResources } from './resources'

// Create Dashboard
// ================
export function createDashboard(conn, title, organizationId) {
  const dashboard = {
    created: new Date().toString(),
    title: xss(title),
    organizationId
  }
  return r
  .table('dashboards')
  .insert(dashboard)
  .run(conn, SOFT_DURABILITY)
  .then(res => ({ ...dashboard, id: res.generated_keys[0] }))
  .error(err => err)
}

// Delete Dashboard
// ================
export function deleteDashboard(conn, dashboard) {
  return r
  .table('dashboards')
  .get(dashboard['id'])
  .delete()
  .run(conn)
  .error(err => err)
}

// Get Dashboard
// =============
export function getDashboard(conn, dashboardId) {
  return r
  .table('dashboards')
  .get(dashboardId)
  .run(conn)
  .error(err => err)
}

// Add User
// ========
export function addUserToDashboard(conn, dashboardId, userId) {
  return r
  .table('dashboards')
  .get(dashboardId)
  .update({ users: r.row('users').append(userId) })
  .run(conn, SOFT_DURABILITY)
  .error(err => err)
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
export function getDashboardData(conn, dashboards) {
  if (dashboards.length === 0)
    return new Promise((resolve) => resolve({}))

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
  .error(err => err)
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
