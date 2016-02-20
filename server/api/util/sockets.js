import { io } from '../../server'
import * as changeTypes from '../../../common/state/constants/changeTypes'

// Emit Changes
// ============
// Listen for data changes to an organization.
// Emit those changes to organizationId namespace.
export function emitChanges(organizationId, tableName) {
  return (err, cursor) => {
    if (err) return err

    const organizationSocket = io.of(`/${organizationId}`)
    // Can be used to test connections.
    // organizationSocket.on('connection', () => {})

    cursor.each((err, change) => {
      if (isAdd(change))
        organizationSocket.emit(`${changeTypes['ADD']}-${tableName}`, change)

      else if (isUpdate(change))
        organizationSocket.emit(`${changeTypes['UPDATE']}-${tableName}`, change)

      else if (isRemove(change))
        organizationSocket.emit(`${changeTypes['REMOVE']}-${tableName}`, change)
    })
  }
}

function isAdd(change) {
  return change['new_val'] && !change['old_val']
}

function isUpdate(change) {
  return change['new_val'] && change['old_val']
}

function isRemove(change) {
  return !change['new_val'] && change['old_val']
}

