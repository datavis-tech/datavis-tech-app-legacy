const curry = require('lodash/curry')
const { DB_DOCUMENTS_COLLECTION } = require('../../constants')

module.exports = curry((connection, referencesIds) => (
  new Promise((resolve, reject) => {
    connection.createFetchQuery(
      DB_DOCUMENTS_COLLECTION,
      {_id: {$in: referencesIds}},
      {},
      (err, referenceDocuments) => err ? reject(err) : resolve(referenceDocuments || []))
  })
))
