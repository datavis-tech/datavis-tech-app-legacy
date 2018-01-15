const curry = require('lodash/curry')
const { DB_DOCUMENTS_COLLECTION } = require('../../constants')

module.exports = curry((connection, id) => (
  new Promise((resolve, reject) => {
    connection.createFetchQuery(
      DB_DOCUMENTS_COLLECTION,
      {references: {$elemMatch: {id}}},
      {},
      (err, referenceDocuments) => err ? reject(err) : resolve(referenceDocuments || []))
  })
))
