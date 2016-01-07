import xss from 'xss'
import r from 'rethinkdb'
import config from '../../../config/dbConfig'
import normalize from '../util/normalize'

function connect() {
  return r.connect(config)
}

// Lists
// =====
export function addList(list) {
  return connect()
  .then(conn => {
    list.created = new Date()
    list.title = xss(list.title)
    return r
    .table('lists')
    .insert(list).run(conn)
    .then(response => {
      return Object.assign({}, list, { id: response.generated_keys[0] })
    })
  })
}

export function getLists() {
  return connect()
  .then(conn => {
    return r
    .table('lists')
    .orderBy('id').run(conn)
    .then(cursor => cursor.toArray())
    .then(cursor => normalize(cursor))
  })
}

// TODO: use lists to fill specific lists (not all in table)
export function getListResources(lists) { // eslint-disable-line no-unused-vars
  return connect()
  .then(conn => {
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
  })
}
