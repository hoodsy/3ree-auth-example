import r from 'rethinkDB'
import config from './rethinkDb/dbConfig'
import { TABLES } from './dbSetup'

export default function liveUpdates(io) {
  console.log('Setting up listener...')
  r.connect(config, (err, conn) => {
    r
    .table('lists')
    .changes().run(conn, (err, cursor) => {
      console.log('Listening for changes...')
      cursor.each((err, change) => {
        console.log('Change detected', change)
        io.emit('event-change', change)
      })
    })
  })
}
