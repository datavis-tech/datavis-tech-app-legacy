const curry = require('lodash/curry')
const { serializeDocument } = require('../../db/serializers')
const getDocument = require('../documentContentSandbox/getDocument')
const getReferencedDocuments = require('../documentContentSandbox/getReferencedDocuments')
const zip = require('./zip')

module.exports = curry(async (connection, id) => {
  const document = serializeDocument(await getDocument(connection, id))
  const referencedDocuments = (await getReferencedDocuments(connection, document.referencesIds)).map(serializeDocument)
  return {
    zip: zip(document, referencedDocuments),
    fileName: `${document.title.replace(/ /g, '_')}.zip`
  }
})
