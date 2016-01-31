import * as service from '../api/dashboards'

export function createDashboard(req, res, next) {
  service.createDashboard(req.dbConn, req.body)
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
