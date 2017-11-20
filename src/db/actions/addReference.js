import { push } from './primitives'

// Adds the given reference (fileName and id)
// to the given document.
export const addReference = (shareDBDoc, fileName = '', id = '') => (
  push({
    shareDBDoc,
    property: 'references',
    item: {
      fileName,
      id
    }
  })
)
