const find = require('lodash/find')
const { getHrefForRoute } = require('../../routesUtils')
const formatDocumentDescription = require('./formatDocumentDescription')

module.exports = function formatVisualizationDescription (
  document,
  referencedDocuments
) {

  const visOrigin = getHrefForRoute('vis', {id: document.id})

  const descriptionParts = [
    formatDocumentDescription(document.title, document.description, visOrigin, document.title)
  ]

  document.references.forEach(({id, fileName}) => {
    const rd = find(referencedDocuments, {id})
    const rOrigin = getHrefForRoute(rd.type, {id})
    descriptionParts.push(formatDocumentDescription(fileName, rd.description, rOrigin, rd.title, 2))
  })

  return descriptionParts.join('\n\n')
}
