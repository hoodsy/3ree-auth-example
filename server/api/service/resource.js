import xss from 'xss';
import r from 'rethinkdb';
import config from '../../../config/dbConfig';

function connect() {
  return r.connect(config);
}

// Resources
// =====
export function addResource(resource) {
  return connect()
  .then(conn => {
    resource.created = new Date();
    resource.text = xss(resource.text);
    return r
    .table('resources')
    .insert(resource).run(conn)
    .then(response => {
      return Object.assign({}, resource, { id: response.generated_keys[0] });
    });
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
