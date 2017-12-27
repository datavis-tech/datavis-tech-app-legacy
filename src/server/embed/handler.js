const { serializeDocument } = require('../../db/serializers')
const { files: filesAccessor } = require('../../db/accessors')
const getDocument = require('./getDocument')
const getReferencedDocuments = require('./getReferencedDocuments')
const { injectLogo, withBodyTag, withHtmlTag } = require('./html')
const magicSandbox = require('./magicSandbox')

module.exports = (backend) => {

  const connection = backend.connect()

  const getDocumentFromConnection = getDocument(connection)
  const getReferencedDocumentsFromConnection = getReferencedDocuments(connection)

  return async (req, res) => {
    const serializedDocument = serializeDocument(await getDocumentFromConnection(req.params.id))
    const serializedReferencedDocuments = (await getReferencedDocumentsFromConnection(serializedDocument.referencesIds) || []).map(serializeDocument)

    const files = filesAccessor(serializedDocument.references, serializedReferencedDocuments)
    const content = injectLogo(withBodyTag(withHtmlTag(serializedDocument.content)))

    res.send(magicSandbox(content, files, req.query.origin))
  }
}
