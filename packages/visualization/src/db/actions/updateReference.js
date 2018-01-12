import { setInList } from './primitives'

// TODO: test
export const updateReference = (shareDBDoc, index, item) => {
  setInList({shareDBDoc, property: 'references', index, item})
}
