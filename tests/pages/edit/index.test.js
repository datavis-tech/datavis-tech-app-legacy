import React from 'react'
import { shallow } from 'enzyme'

jest.mock('../../../src/components/page', () => args => args)

jest.mock('../../../src/routes')
import { Router } from '../../../src/routes'

import fakeUser from '../../utils/fakeUser'

import EditPageContent from '../../../src/pages/edit/editPageContent'
import EditPage from '../../../src/pages/edit'

describe('data page', () => {
  let sut
  let id
  let user
  let store
  let document
  let references

  // let document
  // let references

  let props

  beforeEach(() => {
    id = String(Math.random())
    user = fakeUser().data

    document = Symbol('document')
    references = [Symbol('doc1')]

    store = {
      add: jest.fn()
    }

    props = {
      id,
      user,
      store,
      document,
      references
    }

    sut = shallow(<EditPage {...props} />)
  })

  it('should render edit page content', () => {
    expect(sut.find(EditPageContent).props()).toMatchObject({
      id,
      user,
      documentStore: store
    })
  })

  describe('on document delete', () => {
    beforeEach(() => {
      sut.find(EditPageContent).prop('onDocumentDelete')()
    })

    it('should change route to forked document view page', () => {
      expect(Router.pushRoute).toHaveBeenCalledWith('profile', {
        username: user.username
      })
    })
  })
})
