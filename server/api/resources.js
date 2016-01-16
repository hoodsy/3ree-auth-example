import xss from 'xss'
import r from 'rethinkdb'

import config from '../config/dbConfig'

// Resources
// =========
export function addResource(resource) {
  return r.connect(config)
  .then(conn => {
    resource.created = new Date().toString()
    resource.url = xss(resource.url)
    return r
    .table('resources')
    .insert(resource).run(conn)
    .then(response => {
      return Object.assign({}, resource, { id: response.generated_keys[0] })
    })
  })
}
