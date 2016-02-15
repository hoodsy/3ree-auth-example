import r from 'rethinkdb'
import _ from 'lodash'

import { dbTables } from './dbTables'
import config from './dbConfig'

function listenOnTable(conn, io, name) {
  r.table(name)
  .changes()
  .run(conn, (err, cursor) => {
    console.info(`ChangeFeed => SocketIO: ${name}`) // eslint-disable-line no-console
    console.info('----------') // eslint-disable-line no-console
    cursor.each((err, change) => io.emit(`${name}-change`, change))
  })
}

export default function (io) {
  r.connect(config, (err, conn) => {
    _.map(dbTables, name => listenOnTable(conn, io, name))
  })
}
