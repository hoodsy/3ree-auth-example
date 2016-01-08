import * as service from './service'

// Resources
// =====
export function addResource(req, res) {
  service.addResource(req.body)
  .then((resource) => res.json(resource))
  .catch(err => {
    res.status(400)
    res.json({ error: err, resource: req.body })
  })
}

// Lists
// =====
export function addList(req, res) {
  service.addList(req.body)
  .then((list) => res.json(list))
  .catch(err => {
    res.status(400)
    res.json({ error: err, list: req.body })
  })
}

export function getLists(req, res) {
  service.getLists()
  .then((lists) => res.json(lists))
  .catch(err => {
    res.status(400)
    res.json({ error: err })
  })
}

// Dashboards
// ==========
export function addDashboard(req, res) {
  service.addDashboard(req.body)
  .then((dashboard) => res.json(dashboard))
  .catch(err => {
    res.status(400)
    res.json({ error: err, dashboard: req.body })
  })
}

export function getDashboards(req, res) {
  service.getDashboards()
  .then((dashboards) => res.json(dashboards))
  .catch(err => {
    res.status(400)
    res.json({ error: err })
  })
}
