import {
  id,
  hasData,
  title,
  description,
  content,
  owner,
  collaborators
} from '../../src/db/accessors'

import {
  deleteDocument,
  addCollaborator,
  removeCollaborator
} from '../../src/db/actions'

export const Dataset = shareDBDoc => ({
  id: () => id(shareDBDoc),
  hasData: () => hasData(shareDBDoc),
  title: () => title(shareDBDoc),
  description: () => description(shareDBDoc),
  content: () => content(shareDBDoc),
  owner: () => owner(shareDBDoc),
  collaborators: () => collaborators(shareDBDoc),

  deleteDocument: callback => deleteDocument(shareDBDoc, callback),
  addCollaborator: collaboratorUserId => addCollaborator(shareDBDoc, collaboratorUserId),
  removeCollaborator: () => removeCollaborator(shareDBDoc)
})
