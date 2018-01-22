const get = require('lodash/get')
// TODO split this into separate files for each accessor.

/****************************
 * For any ShareDB document *
 ****************************/

// Gets the data inside a doc,
// returning an empty object if passed undefined as doc.

const data = doc => (doc && doc.data) ? doc.data : {}

// Returns true if the given document has data loaded, false otherwise.
const hasData = doc => !!(doc && doc.data)

// Access the id of a document.
const id = doc => (doc && doc.id) || ''

/**********************************
 * For "vis" and "data" Documents *
 **********************************/

// This accessor returns the references for the given document,
// or an empty array if there are no references.
const references = doc => data(doc).references || []

// Returns the ids of the references for the given document.
const referenceIds = doc => references(doc).map(reference => reference.id)

// Access the title of a document.
const title = doc => data(doc).title || ''

// Access the description of a document.
const description = doc => data(doc).description || ''

// Access the type of a document.
// If type is undefined, treat it as 'vis'.
const type = doc => data(doc).type || 'vis'

// Access the content of a document.
const content = doc => data(doc).content || ''

// Access the owner of a document.
const owner = doc => data(doc).owner || ''

// access the collaborators of a document.
const collaborators = doc => data(doc).collaborators || []

const collaboratorIds = doc => collaborators(doc).map(c => c.id)

// access the id of the document this one was forked from, if any.
const forkedFrom = doc => data(doc).forkedFrom

const isPrivate = doc => data(doc).isPrivate || false

const thumbnail = doc => data(doc).thumbnail

// This function returns true if all references have been loaded.
// references is the array of reference objects stored in the ShareDB document
// referenceDocuments is the array of serialized documents for references.
const allReferencesLoaded = (references, referenceDocuments) => {

  // If there are no references, return true.
  if (references.length === 0) {
    return true
  }

  // If there are references, return true if there are any elements,
  // because DocumentSubscriptions only passes documents after all are loaded.
  return referenceDocuments && referenceDocuments.length > 0
}

// Constructs the "files" object expected by MagicSandbox.js,
// using the file names from `references`, and content from `referenceDocs`.
const files = (references, referenceDocuments) => references
  .reduce((files, {fileName}, i) => {
    files[fileName] = {
      content: referenceDocuments[i].content
    }
    return files
  }, {})

/**********************************
 * For "profile" Documents *
 **********************************/
const profile = doc => (doc && doc.data) ? doc.data : null

/**********************************
 * For ShareDB Ops (operations)
 **********************************/

// Checks if the given op manipulates the content field of the document.
const isContentOp = op => get(op, 'op[0].p[0]') === 'content'

module.exports = {
  hasData,
  id,
  references,
  referenceIds,
  title,
  description,
  type,
  content,
  owner,
  collaborators,
  collaboratorIds,
  forkedFrom,
  isPrivate,
  allReferencesLoaded,
  files,
  profile,
  thumbnail,
  isContentOp
}
