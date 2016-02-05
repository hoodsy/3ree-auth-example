// Db Tables
// =========
export const dbTables = [
  'dashboards',
  'lists',
  'resources',
  'users'
]

// Db Tables w/ Index
// ==================
export const dbTablesWithIndex = [
  { table: 'lists', index: 'dashboardId' },
  { table: 'resources', index: 'listId' },
  { table: 'users', index: 'email' }
]
