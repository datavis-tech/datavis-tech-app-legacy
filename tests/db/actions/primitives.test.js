import fakeDoc from '../../utils/fakeDoc'
import { set } from '../../../src/db/actions/primitives'

describe('primitives', () => {

  let sut

  let shareDBDoc
  let property
  let item

  describe('set', () => {

    beforeEach(() => {

      sut = set

      property = String(Math.random())
      item = Symbol('item')
      shareDBDoc = fakeDoc()

      shareDBDoc.data[property] = Symbol('old property')

      sut({shareDBDoc, property, item})
    })

    it('should', () => {
      expect(shareDBDoc.submitOp).toHaveBeenCalledWith([{
        p: [property],
        oi: item,
        od: shareDBDoc.data[property]
      }])
    })

  })

})
