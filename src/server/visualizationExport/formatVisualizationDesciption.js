module.exports = function formatVisualizationDescription (
  document,
  referencedDocuments
) {
  return [
    document.description,
    ...referencedDocuments.map(d => d.description)
  ].join('\n\n')
}
