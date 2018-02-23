const flow = require('lodash/flow')
const identity = require('lodash/identity')
const partialRight = require('lodash/partialRight')
const get = require('lodash/get')
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

  const prepareHtml = flow([withHtmlTag, withBodyTag])
  const extractReferences = partialRight(get, 'references')
  const extractContent = partialRight(get, 'content')

  return async ({id, href, origin}) => {

    console.log(id, href, origin)

    const injectLogoWithHrefToVis = href ? partialRight(injectLogo, href) : identity
    const getProccessedHtml = flow([prepareHtml, injectLogoWithHrefToVis])
    const getMagicSandbox = partialRight(magicSandbox, origin)

    const serializedDocument = serializeDocument(await getDocumentFromConnection(id))
    const serializedReferencedDocuments = (await getReferencedDocumentsFromConnection(serializedDocument.referencesIds)).map(serializeDocument)

    console.log(serializedDocument.references)
    console.log(serializedReferencedDocuments.map(rd => rd.id))

    const getDocumentFilesFromReferences = partialRight(filesAccessor, serializedReferencedDocuments)

    const getFiles = flow([extractReferences, getDocumentFilesFromReferences])
    const getContent = flow([extractContent, getProccessedHtml])

    return getMagicSandbox(getContent(serializedDocument), getFiles(serializedDocument))
  }
}
