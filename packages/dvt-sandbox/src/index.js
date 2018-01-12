const flow = require('lodash/flow')
const partialRight = require('lodash/partialRight')
const get = require('lodash/get')

const { serializeDocument, accessors: { files: filesAccessor } } = require('dvt-core').db

const getDocument = require('./getDocument')
const getReferencedDocuments = require('./getReferencedDocuments')
const magicSandbox = require('./magicSandbox')
const { injectLogo, withBodyTag, withHtmlTag } = require('./html')

module.exports = (backend) => {

  const connection = backend.connect()

  const getDocumentFromConnection = getDocument(connection)
  const getReferencedDocumentsFromConnection = getReferencedDocuments(connection)

  const prepareHtml = flow([withHtmlTag, withBodyTag])
  const extractReferences = partialRight(get, 'references')
  const extractContent = partialRight(get, 'content')

  return async ({id, origin, withLogo = true, href = 'https://datavis.com'} = {}) => {

    const injectLogoWithHrefToVis = partialRight(injectLogo, href)
    const getProccessedHtml = flow([prepareHtml, injectLogoWithHrefToVis])
    const getMagicSandbox = partialRight(magicSandbox, origin)

    const serializedDocument = serializeDocument(await getDocumentFromConnection(id))
    const serializedReferencedDocuments = (await getReferencedDocumentsFromConnection(serializedDocument.referencesIds)).map(serializeDocument)

    const getDocumentFilesFromReferences = partialRight(filesAccessor, serializedReferencedDocuments)

    const getFiles = flow([extractReferences, getDocumentFilesFromReferences])
    const getContent = flow([extractContent, getProccessedHtml])

    return getMagicSandbox(getContent(serializedDocument), getFiles(serializedDocument))
  }
}