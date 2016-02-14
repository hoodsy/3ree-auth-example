import socketClient from 'socket.io-client'
import _ from 'lodash'

import { dbTables } from '../server/config/rethinkDb/dbTables'

export default function(store) {
  const { dispatch } = store
  const { organization: { id } } = store.getState()
  // const io = socketClient.connect('http://localhost:3000')
  const socket = socketClient(`http://localhost:3000/${id}`)

  socket.on(`change`, change => {
    console.log(`change`, change)
  })

  // function receiveChange(name) {
  //   io.on(`${name}-change`, change => {
  //     console.log(`${name}-change `, change)
  //   })
  // }
  // _.map(dbTables, receiveChange)

  // return io
  return socket
}
