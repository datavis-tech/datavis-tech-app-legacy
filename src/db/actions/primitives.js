// Pushes an item onto to end of the array at the given property.
export const push = ({shareDBDoc, property, item}) => {

  // If property is undefined, then create an empty array.
  if (!shareDBDoc.data[property]) {
    shareDBDoc.submitOp([{
      p: [property],
      oi: []
    }])
  }

  // Push item onto the end of the array.
  shareDBDoc.submitOp([{
    p: [property, shareDBDoc.data[property].length],
    li: item
  }])

}

// Removes the item at the given index from list at the given property.
export const listDelete = ({shareDBDoc, property, index}) => {
  shareDBDoc.submitOp([{
    p: [property, index],
    ld: shareDBDoc.data[property][index]
  }])
}
