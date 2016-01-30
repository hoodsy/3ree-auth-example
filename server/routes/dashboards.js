import * as service from '../api/dashboards'

export function createDashboard(req, res, next) {
  service.createDashboard(req.dbConn, req.body)
  .then((dashboard) => res.json(dashboard))
  .error(err => {
    err.status = 400
    next(err)
  })
}

export function getDashboards(req, res, next) {
  service.getDashboards(req.dbConn)
  .then((dashboards) => res.json(dashboards))
  .error(err => {
    err.status = 400
    next(err)
  })
}
