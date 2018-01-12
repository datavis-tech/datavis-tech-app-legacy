// This gets called after the user clicks through the delete confirm modal.
export const deleteDocument = (doc, callback) => {
  doc.del(callback)
}
