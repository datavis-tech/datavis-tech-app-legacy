// This accessor returns the references for the given document,
// or an empty array if there are no references.
const references = doc => doc.data.references || []

const referenceIds = doc => references(doc).map(reference => reference.id)

// This function returns true if all references have been loaded.
const allReferencesLoaded = (doc, referenceDocs) => {

  // If there are no references, return true.
  if (referenceIds(doc).length === 0) {
    return true
  }

  // If there are references, return true if there are any elements,
  // because DocumentSubscriptions only passes documents after all are loaded.
  return referenceDocs.length > 0
}

export {
  references,
  referenceIds,
  allReferencesLoaded
}
