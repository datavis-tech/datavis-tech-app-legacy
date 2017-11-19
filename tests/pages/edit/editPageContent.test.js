import React from 'react'
import {mount} from 'enzyme'

jest.mock('../../../src/pages/edit/components/editPageForm')
import EditPageForm from '../../../src/pages/edit/components/editPageForm'

jest.mock('../../../src/db/subscriptions/documentSubscriptions')
import ReferencesSubscription from '../../../src/db/subscriptions/documentSubscriptions'

import fakeDoc from '../../utils/fakeDoc'
import fakeUser from '../../utils/fakeUser'
import fakeSubscription from '../../utils/fakeSubscription'

import EditPageContent from '../../../src/pages/edit/editPageContent'

describe('edit page content', () => {

  let sut
  let props
  let id
  let user
  let doc
  let onDocumentDelete

  let referencesSubscription

  let referenceDocs

  beforeAll(() => {
    process.browser = true
  })

  afterAll(() => {
    delete process.browser
  })

  beforeEach(() => {

    referenceDocs = [fakeDoc(), fakeDoc()]

    referencesSubscription = fakeSubscription(({onUpdate}) => onUpdate(referenceDocs))
    ReferencesSubscription.mockReturnValue(referencesSubscription)

    id = String(Math.random())
    user = fakeUser()
    doc = fakeDoc({
      data: {
        references: referenceDocs.map(rd => ({fileName: String(Math.random()), id: rd.id}))
      }
    })

    onDocumentDelete = jest.fn()

    props = {id, user, doc, onDocumentDelete}

    EditPageForm.mockImplementation(() => null)

    sut = mount(<EditPageContent {...props} />)
  })

  it('should create references subscription', () => {
    expect(ReferencesSubscription).toHaveBeenCalledWith({ids: referenceDocs.map(r => r.id)})
  })

  describe('edit page form', () => {
    let editPageFormProps

    beforeEach(() => {
      editPageFormProps = sut.find(EditPageForm).props()
    })

    it('should render edit page form', () => {
      expect(editPageFormProps).toMatchObject({
        doc,
        referenceDocs
      })
    })

    it('should notify about deletion', () => {
      editPageFormProps.onDocumentDelete()
      expect(onDocumentDelete).toHaveBeenCalled()
    })

  })

})
