import xss from 'xss'
import r from 'rethinkdb'

import { SOFT_DURABILITY,
         normalize } from './util'
import { getUsers } from './users'
import { getDashboardData } from './dashboards'

// Get Dashboard
// =============
export function getOrganization(conn, organizationId) {
  return r
  .table('organizations')
  .get(organizationId)
  .run(conn)
  .error(err => err)
}

// Create Organization
// ===================
export function createOrganization(conn, title, userId) {
  const organization = {
    created: new Date().toString(),
    title: xss(title),
    users: [ xss(userId) ],
    dashboards: []
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

// Add Dashboard
// =============
export function addDashboardToOrganization(conn, organizationId, dashboardId) {
  return r
  .table('organizations')
  .get(organizationId)
  .update({ dashboards: r.row('dashboards').append(dashboardId) })
  .run(conn, SOFT_DURABILITY)
  .error(err => err)
}

// Remove Dashboard
// ================
export function removeDashboardFromOrganization(conn, organizationId, dashboardId) {
  return r
  .table('organizations')
  .get(organizationId)
  .update({
    dashboards: r.row('dashboards').difference([ dashboardId ])
  })
  .run(conn)
  .error(err => err)
}

// Get Organization w/ Data
// ========================
export function getOrganizationData(conn, organizationId) {
  if (!organizationId)
    return new Promise(resolve => resolve({
      dashboardsById: {},
      listsById: {},
      resourcesById: {},
      usersById: {},
      organization: {}
    }))

  return r.table('organizations')
  .get(organizationId)
  .run(conn)
  .then(organization => {
    const {
      users,
      dashboards
    } = organization

    return getDashboardData(conn, dashboards)
    .then(dashboardData => {
      return getUsers(conn, users)
      .then(normalize)
      .then(usersById => ({
        ...dashboardData,
        usersById,
        organization
      }))
    })
  })
  .error(err => err)
}
