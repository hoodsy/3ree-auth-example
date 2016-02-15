import socketClient from 'socket.io-client'
import _ from 'lodash'

import { dbTables } from '../server/config/rethinkDb/dbTables'
import * as actions from '../common/state/actions'

// Listen for changes of the format:
// changeType-TableName
// on the organizationId socket.
// -----
// If a change is received, dispatch
// the corresponding action.
// -----
// Example:
// update-organizations
// dispatch(updateOrganization)
// -----
export default function (store) {
  const { dispatch } = store
  const { organization: { id } } = store.getState()
  const socket = socketClient(`/${id}`)

  listenForChanges(socket, dispatch)
  return socket
}

function listenForChanges(socket, dispatch) {
  return _.map(getChangeObjects(), changeObject => {
    _.map(changeObject, receiveChanges(socket, dispatch))
  })
}

function receiveChanges(socket, dispatch) {
  return ({ changeType, tableName }) => {
    socket.on(`${changeType}-${tableName}`, change => {
      console.log(`${changeType}-${tableName}`, change)
      tableName = _.capitalize(tableName).slice(0, -1)
      dispatch(actions[`${changeType}${tableName}`](change.new_val))
    })
  }
}

function getChangeObjects() {
  return _.map(dbTables, createChangeObjects)
}

function createChangeObjects(tableName) {
  const changeTypes = [ 'create', 'update', 'delete' ]
  return _.map(changeTypes, createChangeMethod(tableName))
}

function createChangeMethod(tableName) {
  return changeType => ({ tableName, changeType })
}
