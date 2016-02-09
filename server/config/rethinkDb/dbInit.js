import r from 'rethinkdb'
import async from 'async'

import config from './dbConfig'
import { dbTables,
         dbTablesWithIndex } from './dbTables'

function createDb(next) {
  r.connect(config, (err, conn) => {
    r.dbCreate('anchor')
    .run(conn, (err, res) => {
      conn.close()
      next(err, res)
    })
  })
}

function createTable(name, next) {
  r.connect(config, (err,conn) => {
    r.tableCreate(name)
    .run(conn, (err, res) => {
      conn.close()
      next(err, res)
    })
  })
}

function createTables(next) {
  async.map(dbTables, createTable, next)
}

function createIndex(target, next) {
  r.connect(config, (err,conn) => {
    r.table(target.table)
    .indexCreate(target.index)
    .run(conn, (err, res) => {
      conn.close()
      next(err, res)
    })
  })
}

function createIndexes(next) {
  async.map(dbTablesWithIndex, createIndex, next)
}

async.series({
  created : createDb,
  tables : createTables,
  indexes : createIndexes
}, (err, res) => {
  console.log(err)
  console.log('============')
  console.log(res)
  console.log('============')
})
