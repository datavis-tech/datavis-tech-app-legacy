import React from 'react'
import {shallow} from 'enzyme'

import fakeUser from '../../utils/fakeUser'

jest.mock('../../../src/routes')
import {Router} from '../../../src/routes'

jest.mock('../../../src/db/actions')
import {deleteDocument} from '../../../src/db/actions'

import ViewPage from '../../../src/components/viewPage/viewPage'
jest.mock('../../../src/pages/edit/editPageContent')
import EditPageContent from '../../../src/pages/edit/editPageContent'
import EditPage from '../../../src/pages/edit'

describe('edit page', () => {

  let sut
  let props
  let id
  let user

  beforeEach(() => {
    id = Symbol('id')
    user = fakeUser()
    props = {id, user}
    sut = shallow(<EditPage {...props} />).dive()
  })

  it('should render view page with id', () => {
    expect(sut.find(ViewPage).props()).toMatchObject({id})
  })

  describe('edit page content', () => {

    let doc
    let Children
    let editPageContentProps

    beforeEach(() => {
      doc = Symbol('doc')
      Children = sut.prop('children')
      editPageContentProps = shallow(<Children doc={doc} />).find(EditPageContent).props()
    })

    it('should render view page with edit page content', () => {
      expect(editPageContentProps).toMatchObject({
        id,
        user,
        doc
      })
    })

    describe('doc deletion', () => {

      beforeEach(() => {
        deleteDocument.mockImplementation((doc, callback) => callback())
        editPageContentProps['onDocumentDelete']()
      })

      it('should delete document', () => {
        expect(deleteDocument.mock.calls[0][0]).toBe(doc)
      })

      it('should change route to profile on success', () => {
        expect(Router.pushRoute).toHaveBeenCalledWith(
          'profile',
          {username: user.data.username}
        )
      })

    })

  })

})
