import { listDelete } from './primitives'

// Removes the collaborator at the given index from the given document.
export const removeCollaborator = (shareDBDoc, index) => (
  listDelete({
    shareDBDoc,
    property: 'collaborators',
    index
  })
)
