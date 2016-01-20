import r from 'rethinkdb'
import async from 'async'

import config from './dbConfig'

function createDb(next) {
  r.connect(config, (err, conn) => {
    r.dbCreate('anchor')
    .run(conn, (err,res) => {
      conn.close()
      next(err,res)
    })
  })
}

function createTable(name, next) {
  r.connect(config, (err,conn) => {
    r.tableCreate(name)
    .run(conn, (err,res) => {
      conn.close()
      next(err,res)
    })
  })
}

function createTables(next) {
  async.map([ 'dashboards', 'lists', 'resources', 'users' ], createTable, next)
}

function createIndex(target, next) {
  r.connect(config, (err,conn) => {
    r.table(target.table)
    .indexCreate(target.index)
    .run(conn, (err,res) => {
      conn.close()
      next(err,res)
    })
  })
}

function createIndexes(next) {
  async.map([
    { table: 'lists', index: 'dashboardId' },
    { table: 'resources', index: 'listId' },
    { table: 'users', index: 'email' }
  ], createIndex, next)
}

async.series({
  created : createDb,
  tables : createTables,
  indexes : createIndexes
}, (err,res) => {
  console.log(res)
})
