import * as service from '../api/resources'

export function addResource(req, res, next) {
  service.addResource(req.dbConn, req.body)
  .then((resource) => res.json(resource))
  .error(err => {
    err.status = 400
    next(err)
  })
}
