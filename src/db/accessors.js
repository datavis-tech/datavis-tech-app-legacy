/****************************
 * For any ShareDB document *
 ****************************/

// Gets the data inside a doc,
// returning an empty object if passed undefined as doc.
const data = doc => (doc && doc.data) ? doc.data : {}

// Returns true if the given document has data loaded, false otherwise.
export const hasData = doc => !!(doc && doc.data)

// Access the id of a document.
export const id = doc => (doc && doc.id) || ''

/**********************************
 * For "vis" and "data" Documents *
 **********************************/

// This accessor returns the references for the given document,
// or an empty array if there are no references.
export const references = doc => data(doc).references || []

// Returns the ids of the references for the given document.
export const referenceIds = doc => references(doc).map(reference => reference.id)

// This function returns true if all references have been loaded.
export const allReferencesLoaded = (doc, referenceDocs) => {

  // If there are no references, return true.
  if (referenceIds(doc).length === 0) {
    return true
  }

  // If there are references, return true if there are any elements,
  // because DocumentSubscriptions only passes documents after all are loaded.
  return referenceDocs && referenceDocs.length > 0
}

// Access the title of a document.
export const title = doc => data(doc).title || ''

// Access the description of a document.
export const description = doc => data(doc).description || ''

// Access the type of a document.
// If type is undefined, treat it as 'vis'.
export const type = doc => data(doc).type || 'vis'

// Access the content of a document.
export const content = doc => data(doc).content || ''

// Access the owner of a document.
export const owner = doc => data(doc).owner || ''

// Access the collaborators of a document.
export const collaborators = doc => data(doc).collaborators || []

/**********************************
 * For "profile" Documents *
 **********************************/
export const profile = doc => (doc && doc.data) ? doc.data : null
