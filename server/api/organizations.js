import xss from 'xss'
import r from 'rethinkdb'

import { SOFT_DURABILITY } from './util'

// Create Organization
// ================
export function createOrganization(conn, title, userId) {
  const organization = {
    created: new Date().toString(),
    title: xss(title),
    users: [ xss(userId) ]
  }
  return r
  .table('organizations')
  .insert(organization)
  .run(conn, SOFT_DURABILITY)
  .then(res => ({ ...organization, id: res.generated_keys[0] }))
  .error(err => err)
}

// Add User
// ========
export function addUserToOrganization(conn, organizationId, userId) {
  return r
  .table('organizations')
  .get(organizationId)
  .update({ users: r.row('users').append(userId) })
  .run(conn, SOFT_DURABILITY)
  .error(err => err)
}
