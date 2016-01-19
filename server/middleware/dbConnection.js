import r from 'rethinkdb'

import config from '../config/rethinkDb/dbConfig'

export function createDbConnection(req, res, next) {
  r.connect(config, (err, conn) => {
    if (err) next(err)
    else {
      req.dbConn = conn
      next()
    }
  })
}

export function closeDbConnection(req, res, next) {
  req.dbConn.close()
  next()
}
