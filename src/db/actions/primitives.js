const set = ({shareDBDoc, property, item}) => (
  shareDBDoc.submitOp([{
    p: [property],
    oi: item,
    od: shareDBDoc.data[property]
  }])
)

// TODO: test
const setInList = ({shareDBDoc, property, index, item}) => (
  shareDBDoc.submitOp([{
    p: [property, index],
    li: item,
    ld: shareDBDoc.data[property][index]
  }])
)

// Pushes an item onto to end of the array at the given property.
const push = ({shareDBDoc, property, item}) => {

  // If property is undefined, then create an empty array.
  if (!shareDBDoc.data[property]) {
    set({shareDBDoc, property, item: []})
  }

  // Push item onto the end of the array.
  shareDBDoc.submitOp([{
    p: [property, shareDBDoc.data[property].length],
    li: item
  }])

}

// Removes the item at the given index from list at the given property.
const listDelete = ({shareDBDoc, property, index}) => {
  shareDBDoc.submitOp([{
    p: [property, index],
    ld: shareDBDoc.data[property][index]
  }])
}

// Adds the given numeric value to the given property.
const add = ({shareDBDoc, property, value}) => {
  shareDBDoc.submitOp([{
    p: [property],
    na: value
  }])
}

module.exports = {
  set,
  setInList,
  push,
  listDelete,
  add
}
