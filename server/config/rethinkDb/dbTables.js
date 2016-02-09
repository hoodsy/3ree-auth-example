// Db Tables
// =========
export const dbTables = [
  'dashboards',
  'lists',
  'resources',
  'users',
  'organizations'
]

// Db Tables w/ Index
// ==================
export const dbTablesWithIndex = [
  { table: 'dashboards', index: 'organizationId' },
  { table: 'lists', index: 'dashboardId' },
  { table: 'resources', index: 'listId' },
  { table: 'users', index: 'email' },
  { table: 'users', index: 'organizationId' }
]
