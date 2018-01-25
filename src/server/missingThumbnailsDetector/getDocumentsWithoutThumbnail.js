const { DB_DOCUMENTS_PROJECTION, VIS_DOC_TYPE } = require('../../constants')

const query = {
  $and: [
    {thumbnail: {$exists: false}},
    {type: VIS_DOC_TYPE}
  ]
}

module.exports = connection => (
  new Promise((resolve, reject) => {
    connection.createFetchQuery(
      DB_DOCUMENTS_PROJECTION,
      query,
      {},
      (err, referenceDocuments) => err ? reject(err) : resolve(referenceDocuments || []))
  })
)
