import {
  id,
  hasData,
  references,
  referenceIds,
  allReferencesLoaded,
  title,
  description,
  content,
  owner,
  collaborators
} from '../../src/db/accessors'

import {
  deleteDocument,
  addCollaborator,
  removeCollaborator,
  addReference,
  removeReference
} from '../../src/db/actions'

export const Visualization = shareDBDoc => ({
  id: () => id(shareDBDoc),
  hasData: () => hasData(shareDBDoc),
  references: () => references(shareDBDoc),
  referenceIds: () => referenceIds(shareDBDoc),
  allReferencesLoaded: referenceDocs => allReferencesLoaded(shareDBDoc, referenceDocs),
  title: () => title(shareDBDoc),
  description: () => description(shareDBDoc),
  content: () => content(shareDBDoc),
  owner: () => owner(shareDBDoc),
  collaborators: () => collaborators(shareDBDoc),

  delete: callback => deleteDocument(shareDBDoc, callback),
  addCollaborator: () => addCollaborator(shareDBDoc),
  removeCollaborator: () => removeCollaborator(shareDBDoc),
  addReference: (fileName, id) => addReference(shareDBDoc, fileName, id),
  removeReference: referenceIndex => removeReference(shareDBDoc, referenceIndex)
})
