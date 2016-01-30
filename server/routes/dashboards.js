import * as service from '../api/dashboards'
import { deleteListsAndResources } from '../api/lists'

export function createDashboard(req, res, next) {
  service.createDashboard(req.dbConn, req.body)
  .then(dashboard => res.json(dashboard))
  .error(err => {
    err.status = 400
    next(err)
  })
}

export function deleteDashboard(req, res, next) {
  service.deleteDashboard(req.dbConn, req.body)
  .then(dashboardResult => { // eslint-disable-line no-unused-vars
    console.log(dashboardResult);
    return res.status(200).json(dashboardResult)
    // deleteListsAndResources(req.dbConn, req.body)
    // .then(listResult => res.status(200).json(listResult))
    // .error(err => {
    //   err.status = 400
    //   next(err)
    // })
  })
  .error(err => {
    err.status = 400
    next(err)
  })
}

export function getDashboards(req, res, next) {
  service.getDashboards(req.dbConn)
  .then(dashboards => res.json(dashboards))
  .error(err => {
    err.status = 400
    next(err)
  })
}
