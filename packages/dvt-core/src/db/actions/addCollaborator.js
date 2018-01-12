import { push } from './primitives'

// Adds a collaborator to the given document.
export const addCollaborator = (shareDBDoc, collaboratorUserId) => (
  push({
    shareDBDoc,
    property: 'collaborators',
    item: {
      id: collaboratorUserId
    }
  })
)
