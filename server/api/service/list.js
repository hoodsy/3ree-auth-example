import xss from 'xss';
import r from 'rethinkdb';
import config from '../../../config/dbConfig';

function connect() {
  return r.connect(config);
}

// Lists
// =====
export function addList(list) {
  return connect()
  .then(conn => {
    list.created = new Date();
    list.resources = [];
    list.text = xss(list.text);
    return r
    .table('lists')
    .insert(list).run(conn)
    .then(response => {
      return Object.assign({}, list, { id: response.generated_keys[0] });
    });
  });
}

export function getLists() {
  return connect()
  .then(conn => {
    return r
    .table('lists')
    .orderBy('id').run(conn)
    .then(cursor => cursor.toArray())
    .then(lists => getResources(lists, conn));
  });
}

export function getResources(lists, conn) {
  return r
  .table('lists')
  .merge(list => {
    const resources = r.table('resources')
      .getAll(list('id'), { index: 'listId' })
      .coerceTo('array');
    return { resources };
  }).run(conn)
  .then(cursor => {
    return cursor.toArray();
  });
}
