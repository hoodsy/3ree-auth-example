import xss from 'xss'
import r from 'rethinkdb'

// Lists
// =====
export function addList(conn, list) {
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

export function getLists(conn) {
  return r
  .table('lists')
  .orderBy('id')
  .run(conn)
  .then(cursor => cursor.toArray())
}

export function getListResources(conn, lists) { // eslint-disable-line no-unused-vars
  return r
  .table('lists')
  .merge(list => {
    const resources = r.table('resources')
      .getAll(list('id'), { index: 'listId' })
      .coerceTo('array')
    return { resources }
  }).run(conn)
  .then(cursor => {
    return cursor.toArray()
  })
}
