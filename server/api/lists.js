import xss from 'xss'
import r from 'rethinkdb'

import { deleteResources } from './resources'

// Create
// ======
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

// Delete Lists
// ============
export function deleteListsAndResources(conn, dashboard) {
  return r
  .table('lists')
  .getAll(dashboard['id'], { index: 'dashboardId' })
  .map(list => {
    // deleteResources(conn, list)
    r
    .table('resources')
    .getAll(list('id'), { index: 'listId' })
    .delete()
    .run(conn)

    return list
  })
  .run(conn)
  // .coerceTo('array')
  // .delete()
}
