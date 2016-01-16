import * as service from '../api/dashboards'

export function addDashboard(req, res, next) {
  service.addDashboard(req.dbConn, req.body)
  .then((dashboard) => res.json(dashboard))
  .error(err => {
    // res.status(400)
    // res.json({ error: err, dashboard: req.body })
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
