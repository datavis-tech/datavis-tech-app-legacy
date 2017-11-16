import { collaborators } from '../accessors'

// Removes the collaborator at the given index from the given document.
export const removeCollaborator = (doc, collaboratorIndex) => {
  doc.submitOp([{
    p: ['collaborators', collaboratorIndex],
    ld: collaborators(doc)[collaboratorIndex]
  }])
}
