import xss from 'xss';
import r from 'rethinkdb';
import config from '../../../config/dbConfig';
import { getResources } from './resource';

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
    list.title = xss(list.title);
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
