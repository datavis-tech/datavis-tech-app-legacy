// Adds a collaborator to the given document.
export const addCollaborator = (doc, collaboratorUserId) => {

  // If collaborators is undefined, then create an empty array.
  if (!doc.data.collaborators) {
    doc.submitOp([{
      p: ['collaborators'],
      oi: []
    }])
  }

  // Push an empty reference object onto the collaborators array.
  doc.submitOp([{
    p: ['collaborators', doc.data.collaborators.length],
    li: { id: collaboratorUserId }
  }])

}
