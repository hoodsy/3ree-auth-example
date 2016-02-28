import socketClient from 'socket.io-client'
import _ from 'lodash'

import { dbTables } from '../server/config/rethinkDb/dbTables'
import * as actions from '../common/state/actions'
import * as changeTypes from '../common/state/constants/changeTypes'

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
    const formattedTableName = _.capitalize(tableName).slice(0, -1)
    socket.on(`${changeType}-${tableName}`, change => {
      console.log(`${changeType}-${tableName}`, change) // eslint-disable-line no-console
      const changeData = (changeType === changeTypes['REMOVE'])
        ? change['old_val']
        : change['new_val']

      dispatch(actions[`${changeType}${formattedTableName}`](changeData))
    })
  }
}

function getChangeObjects() {
  return _.map(dbTables, createChangeObjects)
}

function createChangeObjects(tableName) {
  return _.map(changeTypes, createChangeMethod(tableName))
}

function createChangeMethod(tableName) {
  return changeType => ({ tableName, changeType })
}
