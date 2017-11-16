// Removes the reference at the given index from the given document.
export const removeReference = (doc, referenceIndex) => {

  // Remove the element from the array.
  doc.submitOp([{
    p: ['references', referenceIndex],
    ld: doc.data.references[referenceIndex]
  }])
}
