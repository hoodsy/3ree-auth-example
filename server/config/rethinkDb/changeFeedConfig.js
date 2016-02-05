import r from 'rethinkdb'
import _ from 'lodash'

import config from './dbConfig'

const TABLES = [
  'dashboards'
]

function listenOnTable(conn, io, name) {
  r.table(name)
  .changes()
  .run(conn, (err, cursor) => {
    console.log(`ChangeFeed => SocketIO: ${name}`)
    cursor.each((err, change) => {
      console.log('Change detected', change)
      io.emit('event-change', change)
    })
  })
}

export default function (io) {
  r.connect(config, (err, conn) => {
    _.map(TABLES, tableName => listenOnTable(conn, io, tableName))
  })
}

