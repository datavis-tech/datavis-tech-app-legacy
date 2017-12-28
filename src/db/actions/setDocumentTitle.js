import { set } from './primitives'

export const setDocumentTitle = (shareDBDoc, title) => (
  set({shareDBDoc, property: 'title', item: title})
)
