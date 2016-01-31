import xss from 'xss'
import r from 'rethinkdb'

import { SOFT_DURABILITY } from './util'

// Create
// ======
export function createList(conn, list) {
  list.created = new Date().toString()
  list.title = xss(list.title)
  return r
  .table('lists')
  .insert(list)
  .run(conn, SOFT_DURABILITY)
  .then(response => {
    return Object.assign({}, list, { id: response.generated_keys[0] })
  })
}

// Get Lists
// =========
export function getDashboardLists(conn, dashboard) {
  return r
  .table('lists')
  .getAll(dashboard['id'], { index: 'dashboardId' })
  .run(conn)
}


// Delete Lists
// ============
export function deleteDashboardLists(conn, dashboard) {
  return r
  .table('lists')
  .getAll(dashboard['id'], { index: 'dashboardId' })
  .delete()
  .run(conn)
}
