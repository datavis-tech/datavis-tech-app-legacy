import { add, initializeIfMissing } from './primitives'

export const incrementViewCount = shareDBDoc => {
  initializeIfMissing({
    shareDBDoc,
    property: 'viewCount',
    value: 0
  })

  add({
    shareDBDoc,
    property: 'viewCount',
    value: 1
  })
}
