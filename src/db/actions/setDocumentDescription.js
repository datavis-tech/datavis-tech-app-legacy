import { set } from './primitives'

export const setDocumentDescription = (shareDBDoc, description) => (
  set({shareDBDoc, property: 'description', item: description})
)
