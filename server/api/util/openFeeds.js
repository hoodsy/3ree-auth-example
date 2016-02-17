import r from 'rethinkdb'
import _ from 'lodash'

import config from '../../config/rethinkDb/dbConfig'
import { dbTables } from '../../config/rethinkDb/dbTables'
import { emitChanges } from './sockets'

export default function (organizationId) {

  openOrganizationFeed(organizationId)
  _.map([ 'dashboards', 'users' ], openFeed(organizationId))

}

//
// ===================
export function openOrganizationFeed(organizationId) {
  r.connect(config, (err, conn) => {
    if (err) return err
    return r
    .table('organizations')
    .get(organizationId)
    .changes()
    .run(conn, emitChanges(organizationId, 'organizations'))
    .error(err => err)
  })
}

function openFeed(organizationId) {
  return tableName => {
    r.connect(config, (err, conn) => {
      return r
      .table(tableName)
      .getAll(organizationId, { index: 'organizationId' })
      .changes()
      .run(conn, emitChanges(organizationId, tableName))
      .error(err => err)
    })
  }
}

function openDashboardFeed(organizationId) {
  r.connect(config, (err, conn) => {
    return r
    .table('dashboards')
    .getAll(organizationId, { index: 'organizationId' })
    .map(dashboard => {
      r.table('lists')
      .getAll(dashboard('id'), { index: 'dashboardId' })
      .map(list => {
        r.table('resources')
        .getAll(list('id'), { index: 'listId' })
        .changes()
        .run(conn, emitChanges(organizationId, 'resources'))
        .error(err => err)
        return dashboard
      })
      .changes()
      .run(conn, emitChanges(organizationId, 'lists'))
      .error(err => err)
      return dashboard
    })
    .run(conn, emitChanges(organizationId, 'dashboards'))
    .error(err => err)
  })
}

