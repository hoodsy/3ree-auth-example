import * as service from '../api/resources'

export function addResource(req, res) {
  service.addResource(req.body)
  .then((resource) => res.json(resource))
  .error(err => {
    res.status(400)
    res.json({ error: err, resource: req.body })
  })
}
