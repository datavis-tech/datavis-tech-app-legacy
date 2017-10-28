import React from 'react'
import {mount} from 'enzyme'

import fakeDoc from '../../utils/fakeDoc'

jest.mock('../../../src/db/subscribeToDocument')
jest.mock('../../../src/db/createProfileQuery')

import subscribeToDocument from '../../../src/db/subscribeToDocument'
import createProfileQuery from '../../../src/db/createProfileQuery'
import ViewPage from '../../../src/components/viewPage/viewPage'

describe('view page', () => {

  let sut
  let Component
  let props

  let id
  let user

  beforeEach(() => {
    Component = props => (
      <ViewPage {...props}>
        { () => <div>{String(Math.random())}</div> }
      </ViewPage>
    )

    id = Symbol('id')
    user = Symbol('user')

    props = {id, user}
    sut = mount(<Component {...props} />)
  })

  describe('non browser env', () => {

    it('should not subscribe to document', () => {
      expect(subscribeToDocument).toHaveBeenCalledTimes(0)
    })

  })

  describe('browser env', () => {

    let callback
    let docId

    beforeAll(() => {
      process.browser = true
      sut.mount()
    })

    afterAll(() => {
      process.browser = undefined
    })

    beforeEach(() => {
      docId = subscribeToDocument.mock.calls[0][0]
      callback = subscribeToDocument.mock.calls[0][1]
    })

    it('should subscribe to document', () => {
      expect(docId).toEqual(id)
    })

    describe('on document changes', () => {

      let doc

      beforeEach(() => {
        doc = fakeDoc()
      })

      it('should throw an error if any error occured', () => {
        expect(() => {
          callback(new Error(), doc)
        }).toThrow()
      })

      describe('no errors', () => {

        beforeEach(() => {
          callback(null, doc)
        })

        it('should create profile', () => {
          expect(createProfileQuery.mock.calls[0][0]).toEqual({
            id: doc.data.owner
          })
        })

      })

    })

  })

})
