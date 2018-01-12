import { set } from './primitives'

export const setDocumentType = (shareDBDoc, type) => (
  set({shareDBDoc, property: 'type', item: type})
)
