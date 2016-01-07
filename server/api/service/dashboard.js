import xss from 'xss'
import r from 'rethinkdb'
import config from '../../../config/dbConfig'
// import { getLists } from './list'
import normalize from '../util/normalize'

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

export function getDashboardLists(dashboards) { // eslint-disable-line no-unused-vars
  return connect()
  .then(conn => {
    return r
    .table('dashboards')
    .merge(dashboard => {
      const lists = r.table('lists')
        .getAll(dashboard('id'), { index: 'dashboardId' })
        .coerceTo('array')
      return { lists }
    }).run(conn)
    .then(cursor => {
      return cursor.toArray()
    })
  })
}
