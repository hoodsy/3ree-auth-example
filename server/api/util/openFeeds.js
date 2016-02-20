import r from 'rethinkdb'
import _ from 'lodash'

import config from '../../config/rethinkDb/dbConfig'
import { emitChanges } from './sockets'

export default function (organizationId) {

  openOrganizationFeed(organizationId)
  const openTableFeed = openFeed(organizationId)
  _.map([ 'dashboards', 'users' ], openTableFeed)

}

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
