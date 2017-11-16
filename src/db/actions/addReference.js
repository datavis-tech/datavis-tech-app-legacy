// Adds the given reference (fileName and id)
// to the given document.
export const addReference = (doc, fileName = '', id = '') => {

  // If references is undefined, then create an empty array.
  if (!doc.data.references) {
    doc.submitOp([{
      p: ['references'],
      oi: []
    }])
  }

  // Push an empty reference object onto the references array.
  doc.submitOp([{
    p: ['references', doc.data.references.length],
    li: { fileName, id }
  }])
}
