import * as service from '../api/organizations'
import { getUserByEmail,
         addOrganizationToUser } from '../api/users'
import openFeeds from '../api/util/openFeeds'

export function createOrganization(req, res, next) {
  const {
    title,
    userId
  } = req.body
  service.createOrganization(req.dbConn, title, userId)
  .then(organization => {
    openFeeds(organization['id'])
    res.json(organization)
  })
  .error(next)
}

export function addUserToOrganization(req, res, next) {
  const {
    organizationId,
    email
  } = req.body
  getUserByEmail(req.dbConn, email)
  .then(userPreUpdate => {
    if (!userPreUpdate)
      return next(new Error(`User at "${email}" doesn't exist.`))

    addOrganizationToUser(req.dbConn, organizationId, userPreUpdate['id'])
    .then(user => {
      service.addUserToOrganization(req.dbConn, organizationId, user['id'])
      .then(() => {
        service.getOrganization(req.dbConn, organizationId)
        .then(organization => res.json({ organization, user }))
        .error(next)
      }).error(next)
    }).error(next)
  }).error(next)
}

export function addDashboardToOrganization(req, res, next) {
  const {
    organizationId,
    dashboardId
  } = req.body
  service.addDashboardToOrganization(req.dbConn, organizationId, dashboardId)
  .then(() => {
    service.getOrganization(req.dbConn, organizationId)
    .then(organization => res.json({ organization }))
    .error(next)
  }).error(next)

}

export function removeDashboardFromOrganization(req, res, next) {
  const {
    organizationId,
    dashboardId
  } = req.body
  service.removeDashboardFromOrganization(req.dbConn, organizationId, dashboardId)
  .then(() => {
    service.getOrganization(req.dbConn, organizationId)
    .then(organization => res.json({ organization }))
    .error(next)
  }).error(next)
}
