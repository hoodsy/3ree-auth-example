import * as service from '../api/dashboards'
import { getUserByEmail } from '../api/users'

export function createDashboard(req, res, next) {
  const {
    title,
    organizationId
  } = req.body
  service.createDashboard(req.dbConn, title, organizationId)
  .then(dashboard => res.json(dashboard))
  .error(next)
}

export function deleteDashboard(req, res, next) {
  service.deleteDashboardData(req.dbConn, req.body)
  .then(dashboardResult => res.json(dashboardResult))
  .error(next)
}

export function getDashboards(req, res, next) {
  service.getDashboards(req.dbConn)
  .then(dashboards => res.json(dashboards))
  .error(next)
}

export function addUserToDashboard(req, res, next) {
  const {
    dashboardId,
    email
  } = req.body
  getUserByEmail(req.dbConn, email)
  .then(user => {
    if (!user)
      return next(new Error(`User at "${email}" doesn't exist.`))
    service.addUserToDashboard(req.dbConn, dashboardId, user['id'])
    .then(result => { // eslint-disable-line no-unused-vars
      service.getDashboard(req.dbConn, dashboardId)
      .then(dashboard => res.json({ dashboard, user }))
      .error(next)
    })
    .error(next)
  })
  .error(next)
}
