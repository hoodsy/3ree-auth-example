import r from 'rethinkdb'
import _ from 'lodash'

import { dbTables } from './dbTables'
import config from './dbConfig'

function listenOnTable(conn, io, name) {
  r.table(name)
  .changes()
  .run(conn, (err, cursor) => {
    console.log(`ChangeFeed => SocketIO: ${name}`)
    console.info('----------')
    cursor.each((err, change) => {
      console.log('Change detected', change)
      io.emit('event-change', change)
    })
  })
}

export default function (io) {
  r.connect(config, (err, conn) => {
    _.map(dbTables, name => listenOnTable(conn, io, name))
  })
}

