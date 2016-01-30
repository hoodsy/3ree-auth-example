import xss from 'xss'
import r from 'rethinkdb'

// Lists
// =====
export function createList(conn, list) {
  list.created = new Date().toString()
  list.title = xss(list.title)
  return r
  .table('lists')
  .insert(list)
  .run(conn)
  .then(response => {
    return Object.assign({}, list, { id: response.generated_keys[0] })
  })
}
