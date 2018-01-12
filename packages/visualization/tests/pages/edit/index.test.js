import React from 'react'
import { shallow } from 'enzyme'

jest.mock('../../../src/components/page', () => args => args)
jest.mock('../../../src/pages/views/viewPageComponentFactory', () => args => args)

jest.mock('../../../src/routes')
import { Router } from '../../../src/routes'

jest.mock('../../../src/db/actions')
import { deleteDocument } from '../../../src/db/actions'

import fakeUser from '../../utils/fakeUser'
import fakeDoc from '../../utils/fakeDoc'

import EditPageContent from '../../../src/pages/edit/editPageContent'
import EditPage from '../../../src/pages/edit'

describe('data page', () => {

  let sut
  let id
  let user
  let doc
  let props

  beforeEach(() => {

    id = String(Math.random())
    user = fakeUser().data
    doc = fakeDoc()

    props = {
      id,
      user,
      doc
    }

    sut = shallow(<EditPage {...props} />)

  })

  it('should render edit page content', () => {
    expect(sut.find(EditPageContent).props()).toMatchObject({
      id, user, doc
    })
  })

  describe('on document delete', () => {

    beforeEach(() => {
      deleteDocument.mockImplementation((doc, callback) => callback())
      sut.find(EditPageContent).prop('onDocumentDelete')(doc)
    })

    it('should delete document', () => {
      expect(deleteDocument.mock.calls[0][0]).toBe(doc)
    })

    it('should change route to forked document view page', () => {
      expect(Router.pushRoute).toHaveBeenCalledWith('profile', {username: user.username})
    })

  })

})
