import * as service from '../api/dashboards'

export function addDashboard(req, res) {
  service.addDashboard(req.body)
  .then((dashboard) => res.json(dashboard))
  .error(err => {
    res.status(400)
    res.json({ error: err, dashboard: req.body })
  })
}

export function getDashboards(req, res) {
  service.getDashboards()
  .then((dashboards) => res.json(dashboards))
  .error(err => {
    res.status(400)
    res.json({ error: err })
  })
}
