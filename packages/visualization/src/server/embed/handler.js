const flow = require('lodash/flow')
const partialRight = require('lodash/partialRight')
const get = require('lodash/get')
const { serializeDocument } = require('../../db/serializers')
const { files: filesAccessor } = require('../../db/accessors')
const { getHrefForRoute } = require('../../routesUtils')
const getDocument = require('./getDocument')
const getReferencedDocuments = require('./getReferencedDocuments')
const { injectLogo, withBodyTag, withHtmlTag } = require('./html')
const magicSandbox = require('./magicSandbox')

module.exports = (backend) => {

  const connection = backend.connect()

  const getDocumentFromConnection = getDocument(connection)
  const getReferencedDocumentsFromConnection = getReferencedDocuments(connection)

  const prepareHtml = flow([withHtmlTag, withBodyTag])
  const extractReferences = partialRight(get, 'references')
  const extractContent = partialRight(get, 'content')

  return async (req, res) => {

    const injectLogoWithHrefToVis = partialRight(injectLogo, getHrefForRoute('vis', {id: req.params.id}))
    const getProccessedHtml = flow([prepareHtml, injectLogoWithHrefToVis])
    const getMagicSandbox = partialRight(magicSandbox, req.query.origin)

    const serializedDocument = serializeDocument(await getDocumentFromConnection(req.params.id))
    const serializedReferencedDocuments = (await getReferencedDocumentsFromConnection(serializedDocument.referencesIds)).map(serializeDocument)

    const getDocumentFilesFromReferences = partialRight(filesAccessor, serializedReferencedDocuments)

    const getFiles = flow([extractReferences, getDocumentFilesFromReferences])
    const getContent = flow([extractContent, getProccessedHtml])

    res.send(getMagicSandbox(getContent(serializedDocument), getFiles(serializedDocument)))
  }
}
