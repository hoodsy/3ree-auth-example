import xss from 'xss'
import r from 'rethinkdb'
import config from '../../../config/dbConfig'
// import { getLists } from './list'
import { extractByType,
         merge,
         normalize } from '../util'

function connect() {
  return r.connect(config)
}

// Dashboards
// ==========
export function addDashboard(dashboard) {
  return connect()
  .then(conn => {
    dashboard.created = new Date()
    dashboard.title = xss(dashboard.title)
    return r
    .table('dashboards')
    .insert(dashboard).run(conn)
    .then(response => {
      return Object.assign({}, dashboard, { id: response.generated_keys[0] })
    })
  })
}

export function getDashboards() {
  return connect()
  .then(conn => {
    return r
    .table('dashboards')
    .orderBy('id').run(conn)
    .then(cursor => cursor.toArray())
    .then(cursor => normalize(cursor))
    // .then(dashboards => getLists(dashboards, conn))
  })
}

export function getDashboardData() {
  return connect()
    .then(conn => {
      return r.table('dashboards')
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
    })
}

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
