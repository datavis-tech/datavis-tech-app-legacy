import React from 'react'
import {mount} from 'enzyme'

import fakeDoc from '../../utils/fakeDoc'

jest.mock('../../../modules/db/subscribeToDocument')
jest.mock('../../../modules/db/createProfileQuery')

import subscribeToDocument from '../../../modules/db/subscribeToDocument'
import createProfileQuery from '../../../modules/db/createProfileQuery'
import ViewPage from '../../../components/viewPage/viewPage'

describe('view page', () => {

  let sut
  let Content
  let Component
  let props

  let id
  let user

  beforeEach(() => {
    Content = () => <div>{String(Math.random())}</div>
    Component = ViewPage(Content)

    id = Symbol('id')
    user = Symbol('user')

    props = {id, user}
    sut = mount(<Component {...props} />)
  })

  it('should be able retrieve id from query', async () => {
    const id = Symbol('id')
    const props = await Component.getInitialProps({query: {id}})
    expect(props).toEqual({id})
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
