const curry = require('lodash/curry')
const { DB_DOCUMENTS_COLLECTION } = require('../../constants')

module.exports = curry((connection, id) => {
  const document = connection.get(DB_DOCUMENTS_COLLECTION, id)
  return new Promise((resolve, reject) => {
    document.fetch(err => err ? reject(err) : resolve(document))
  })
})
