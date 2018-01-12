import { set } from './primitives'

export const setDocumentPrivacy = (shareDBDoc, isPrivate) => (
  set({shareDBDoc, property: 'isPrivate', item: isPrivate})
)
