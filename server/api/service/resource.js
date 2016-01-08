import xss from 'xss'
import r from 'rethinkdb'
import config from '../../../config/dbConfig'

function connect() {
  return r.connect(config)
}

// Resources
// =========
export function addResource(resource) {
  return connect()
  .then(conn => {
    resource.created = new Date()
    resource.url = xss(resource.url)
    return r
    .table('resources')
    .insert(resource).run(conn)
    .then(response => {
      return Object.assign({}, resource, { id: response.generated_keys[0] })
    })
  })
}
