import * as service from '../api/organizations'
import { getUserByEmail } from '../api/users'

export function createOrganization(req, res, next) {
  const {
    title,
    userId
  } = req.body
  service.createOrganization(req.dbConn, title, userId)
  .then(organization => res.json(organization))
  .error(next)
}

export function addUserToOrganization(req, res, next) {
  const {
    organizationId,
    email
  } = req.body
  getUserByEmail(req.dbConn, email)
  .then(user => {
    if (!user)
      return next(new Error(`User at "${email}" doesn't exist.`))
    service.addUserToOrganization(req.dbConn, organizationId, user['id'])
    .then(result => { // eslint-disable-line no-unused-vars
      service.getOrganization(req.dbConn, organizationId)
      .then(organization => res.json({ organization, user }))
      .error(next)
    })
    .error(next)
  })
  .error(next)
}
