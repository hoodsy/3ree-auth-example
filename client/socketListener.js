import socketClient from 'socket.io-client'
import _ from 'lodash'

import { dbTables } from '../server/config/rethinkDb/dbTables'



export default function({ dispatch }) {
  const io = socketClient.connect('http://localhost:3000')

  function receiveChange(name) {
    io.on(`${name}-change`,change => {
      console.log(`${name}-change `, change)
    })
  }
  _.map(dbTables, receiveChange)

  return io
}
