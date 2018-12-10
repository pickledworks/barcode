import { SQLite } from 'expo'

const db = SQLite.openDatabase('db.db')

const createTableIfNotExists = () => {
  const query = `
  create table if not exists entries
    (
      id integer primary key not null, 
      scannedAt datetime not null, 
      content string not null, 
      type string not null
    )
`

  db.transaction(tx => {
    tx.executeSql(query)
  })
}

const createEntry = ({ scannedAt, content, type, success }) => {
  db.transaction(
    tx => {
      tx.executeSql(
        'insert into entries (scannedAt, content, type) values(?, ?, ?)',
        [scannedAt, content, type],
      )
    },
    error => console.log('Error creating entry', error),
    success,
  )
}

const getEntries = success => {
  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql('select * from entries', [], (_, { rows: { _array } }) =>
          resolve(_array),
        )
      },
      error => reject(console.log('Error querying entries: ', error)),
      success,
    )
  })
}

const isLastEntry = content =>
  new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'select max(id), content from entries',
        [],
        (_, { rows: { _array } }) => resolve(_array[0].content === content),
      )
    })
  })

const deleteEntry = (id, success) => {
  db.transaction(
    tx => {
      tx.executeSql('delete from entries where id = ?;', [id])
    },
    error => console.log(`Error deleting entry with id ${id}: `, error),
    null,
  )
}

export default {
  createTableIfNotExists,
  createEntry,
  getEntries,
  isLastEntry,
  deleteEntry,
}
