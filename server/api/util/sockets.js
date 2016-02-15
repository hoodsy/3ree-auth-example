import { io } from '../../server'

// Emit Changes
// ============
// Listen for data changes to an organization.
// Emit those changes to organizationId namespace.
export function emitChanges(organizationId, tableName) {
  return (err, cursor) => {
    if (err) return err

    const organizationSocket = io.of(`/${organizationId}`)
    organizationSocket.on('connection', () => {
      console.info('----------') // eslint-disable-line no-console
      console.info(`Socket Connection => ${organizationId}`) // eslint-disable-line no-console
      console.info('==========') // eslint-disable-line no-console
    })
    let changeType

    cursor.each((err, change) => {
      if (change.new_val && !change.old_val) changeType = 'create'
      else if (change.new_val && change.old_val) changeType = 'update'
      else changeType = 'delete'

      organizationSocket.emit(`${changeType}-${tableName}`, change)
    })
  }
}
