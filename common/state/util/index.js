import _ from 'lodash'

export function extractUsersEmails(usersById) {
  return _.map(usersById, _.property('email'))
}

export function filterByEmail(existingEmails, email) {
  return _.filter(existingEmails, existingEmail =>
    existingEmail === email
  )
}
