import { add } from './primitives'

export const incrementViewCount = shareDBDoc => {
  add({
    shareDBDoc,
    property: 'viewCount',
    value: 1
  })
}
