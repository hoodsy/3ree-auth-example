import * as service from '../api/resources'

export function createResource(req, res, next) {
  service.createResource(req.dbConn, req.body)
  .then((resource) => res.json(resource))
  .error(next)
}
