const jsondiff = require('json0-ot-diff')
const diffMatchPatch = require('diff-match-patch')

module.exports = documentState =>
  jsondiff(documentState.old, documentState.new, diffMatchPatch)
