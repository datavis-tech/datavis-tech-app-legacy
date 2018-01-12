import { listDelete } from './primitives'

// Removes the reference at the given index from the given document.
export const removeReference = (shareDBDoc, index) => (
  listDelete({
    shareDBDoc,
    property: 'references',
    index
  })
)
