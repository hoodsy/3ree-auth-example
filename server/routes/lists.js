import * as service from '../api/lists'

export function addList(req, res, next) {
  service.addList(req.dbConn, req.body)
  .then((list) => res.json(list))
  .error(err => {
    err.status = 400
    next(err)
  })
}

export function getLists(req, res, next) {
  service.getLists(req.dbConn)
  .then((lists) => res.json(lists))
  .error(err => {
    err.status = 400
    next(err)
  })
}
