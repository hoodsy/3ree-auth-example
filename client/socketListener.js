import socketClient from 'socket.io-client'
import _ from 'lodash'

import { dbTables } from '../server/config/rethinkDb/dbTables'
import * as actions from '../common/state/actions'

export default function(store) {
  const { dispatch } = store
  const { organization: { id } } = store.getState()
  const socket = socketClient(`/${id}`)

  function receiveChange(tableName) {
    socket.on(`create-${tableName}`, change => {
      console.log(`create-${tableName}`, change)
    })
    socket.on(`update-${tableName}`, change => {
      console.log(`update-${tableName}`, change)
      tableName = _.capitalize(tableName).slice(0, -1)
      dispatch(actions[`update${tableName}`](change.new_val))

    })
    socket.on(`delete-${tableName}`, change => {
      console.log(`delete-${tableName}`, change)
    })
  }
  _.map(dbTables, receiveChange)

  return socket
}
