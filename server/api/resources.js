import xss from 'xss'
import r from 'rethinkdb'

// Resources
// =========
export function createResource(conn, resource) {
  resource.created = new Date().toString()
  resource.url = xss(resource.url)
  return r
  .table('resources')
  .insert(resource).run(conn)
  .then(response => {
    return Object.assign({}, resource, { id: response.generated_keys[0] })
  })
}
