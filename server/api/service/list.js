import xss from 'xss';
import r from 'rethinkdb';
import config from '../../../config/dbConfig';

function connect() {
  return r.connect(config);
}

export function addList(list) {
  return connect()
  .then(conn => {
    list.created = new Date();
    list.todos = [];
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
    .then(cursor => cursor.toArray());
  });
}

