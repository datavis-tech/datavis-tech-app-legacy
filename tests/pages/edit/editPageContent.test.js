import React from 'react'
import { mount } from 'enzyme'

jest.mock('../../../src/pages/edit/components/editPageForm')
import EditPageForm from '../../../src/pages/edit/components/editPageForm'

jest.mock('../../../src/db/subscriptions/documentSubscriptions')
import ReferencesSubscription from '../../../src/db/subscriptions/documentSubscriptions'

import fakeDoc from '../../utils/fakeDoc'
import fakeUser from '../../utils/fakeUser'
import fakeSubscription from '../../utils/fakeSubscription'

jest.mock('../../../src/db/actions')
import {
  removeCollaborator, addCollaborator,
  addReference, removeReference, updateReference
} from '../../../src/db/actions'

jest.mock('../../../src/pages/edit/addCollaboratorModal', () => () => null)
import AddCollaboratorModal from '../../../src/pages/edit/addCollaboratorModal'

jest.mock('../../../src/pages/edit/getProfileByUsername')
import getProfileByUsername from '../../../src/pages/edit/getProfileByUsername'

import Collaborators from '../../../src/pages/edit/collaborators'

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
        collaborators: [{id: String(Math.random())}, {id: String(Math.random())}, {id: String(Math.random())}],
        references: referenceDocs.map(rd => ({fileName: String(Math.random()), id: rd.id}))
      }
    })

    onDocumentDelete = jest.fn()

    props = {id, user, doc, onDocumentDelete}

    EditPageForm.mockImplementation(() => null)

    sut = mount(<EditPageContent {...props} />)
  })

  afterEach(() => {
    EditPageForm.mockClear()
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

    describe('collaborators', () => {

      let CollaboratorsElement

      beforeEach(() => {
        CollaboratorsElement = EditPageForm.mock.calls[0][0].Collaborators
      })

      it('should render edit form with collaborators', () => {
        expect(CollaboratorsElement.type).toBe(Collaborators)

        const ids = doc.data.collaborators.map(c => c.id)
        expect(CollaboratorsElement.props.ids).toEqual(ids)
      })

      it('should open modal when user tries to add collaborator', () => {
        CollaboratorsElement.props.onCollaboratorAdd()
        sut.update()
        expect(sut.find(AddCollaboratorModal).prop('show')).toBeTruthy()
      })

      it('should remove collaborator when user tries to remove one', () => {
        const index = String(Math.random())
        CollaboratorsElement.props.onCollaboratorRemove(index)
        expect(removeCollaborator).toHaveBeenCalledWith(doc, index)
      })

    })

    describe('references', () => {

      let ReferencesElement

      beforeEach(() => {
        ReferencesElement = EditPageForm.mock.calls[0][0].References
      })

      it('should not contain references if doc type is not equal to vis', () => {
        expect(ReferencesElement).toBeNull()
      })

      describe('doc is of vis type', () => {

        beforeEach(() => {
          doc.data.type = 'vis'
          sut.setState({})
          ReferencesElement = EditPageForm.mock.calls[2][0].References
        })

        it('should contain references', () => {
          expect(ReferencesElement.props.references).toBe(doc.data.references)
        })

        it('should add reference when user tries to add', () => {
          ReferencesElement.props.onReferenceAdd()
          expect(addReference).toHaveBeenCalledWith(doc)
        })

        it('should update reference with fileName and id when user tries to update', () => {
          const id = String(Math.random())
          const fileName = String(Math.random())
          const index = Math.random()
          ReferencesElement.props.onReferenceUpdate(index, {fileName, id})
          expect(updateReference).toHaveBeenCalledWith(doc, index, {fileName, id})
        })

        it('should remove reference when user tries to remove', () => {
          const index = Math.random()
          ReferencesElement.props.onReferenceRemove(index)
          expect(removeReference).toHaveBeenCalledWith(doc, index)
        })

      })

    })

  })

  describe('add collaborator modal', () => {

    let AddCollaboratorModalWrapper

    beforeEach(() => {
      AddCollaboratorModalWrapper = sut.find(AddCollaboratorModal)
    })

    it('should be on the page', () => {
      expect(AddCollaboratorModalWrapper.exists()).toBeTruthy()
    })

    it('should close itself when user closes modal', () => {
      sut.setState({
        showAddCollaboratorModal: true
      })
      AddCollaboratorModalWrapper.prop('onClose')()
      expect(sut.state('showAddCollaboratorModal')).toBeFalsy()
    })

    describe('on collaborator submit', () => {

      let setState
      let username

      beforeEach(() => {
        setState = jest.spyOn(sut.instance(), 'setState')
        username = String(Math.random())
      })

      describe('profile exists', () => {

        let profile = fakeUser()

        beforeEach(async (done) => {
          getProfileByUsername.mockReturnValueOnce(Promise.resolve(profile))
          await AddCollaboratorModalWrapper.prop('onCollaboratorSubmit')(username)
          sut.update()
          done()
        })

        it('should mark modal as loading when start retrieving profile', () => {
          expect(setState.mock.calls[0][0]['loadingCollaboratorProfile']).toBeTruthy()
        })

        it('should try to retrieve profile', () => {
          expect(getProfileByUsername).toHaveBeenCalledWith(username)
        })

        it('should add colaborator', () => {
          expect(addCollaborator).toHaveBeenCalledWith(doc, profile.id)
        })

        it('should close modal, remove loading state and does not set profile not found on success', () => {
          expect(setState.mock.calls[1][0]).toMatchObject({
            showAddCollaboratorModal: false,
            loadingCollaboratorProfile: false,
            profileNotFound: false
          })
        })

      })

      describe('profile does not exists', () => {
        beforeEach(async (done) => {
          getProfileByUsername.mockReturnValueOnce(Promise.reject(new Error()))
          await AddCollaboratorModalWrapper.prop('onCollaboratorSubmit')(username)
          sut.update()
          done()
        })

        it('should mark modal as loading when start retrieving profile', () => {
          expect(setState.mock.calls[0][0]['loadingCollaboratorProfile']).toBeTruthy()
        })

        it('should try to retrieve profile', () => {
          expect(getProfileByUsername).toHaveBeenCalledWith(username)
        })

        it('should not close modal, remove loading state and set profile not found on error', () => {
          expect(setState.mock.calls[1][0]).toMatchObject({
            showAddCollaboratorModal: true,
            loadingCollaboratorProfile: false,
            profileNotFound: true
          })
        })

      })

    })

  })

})
