import React from 'react'
import { mount } from 'enzyme'

jest.mock('../../../src/pages/edit/editPageForm')
import EditPageForm from '../../../src/pages/edit/editPageForm'

jest.mock('../../../src/db/subscriptions/documentSubscriptions')
import ReferencesSubscription from '../../../src/db/subscriptions/documentSubscriptions'

import fakeDoc from '../../utils/fakeDoc'
import fakeUser from '../../utils/fakeUser'
import fakeSubscription from '../../utils/fakeSubscription'
import nodeSelector from '../../utils/nodeSelector'

jest.mock('../../../src/db/actions')
import {
  removeCollaborator, addCollaborator,
  addReference, removeReference, updateReference
} from '../../../src/db/actions'

jest.mock('../../../src/pages/edit/getProfileByUsername')
import getProfileByUsername from '../../../src/pages/edit/getProfileByUsername'

import { serializeDocument } from '../../../src/db/serializers'

jest.mock('../../../src/pages/edit/addCollaboratorModal', () => () => null)
import AddCollaboratorModal from '../../../src/pages/edit/addCollaboratorModal'

import DeleteConfirmModal from '../../../src/pages/edit/deleteConfirmModal'

import Collaborators from '../../../src/pages/edit/collaborators'

import Runner from '../../../src/components/runner/runner'

import FullscreenButton from '../../../src/pages/views/slots/fullscreenButton'

import EditPageContent from '../../../src/pages/edit/editPageContent'

describe('edit page content', () => {

  let sut
  let props
  let setState
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

    setState = jest.spyOn(sut.instance(), 'setState')
  })

  afterEach(() => {
    setState.mockReset()
    EditPageForm.mockClear()
  })

  it('should create references subscription', () => {
    expect(ReferencesSubscription).toHaveBeenCalledWith({ids: referenceDocs.map(r => r.id)})
  })

  describe('edit page form', () => {

    let editPageFormProps
    let CollaboratorsElement
    let ReferencesElement
    let PreviewElement

    beforeEach(() => {
      editPageFormProps = sut.find(EditPageForm).props()
    })

    it('should render edit page form', () => {
      expect(editPageFormProps).toMatchObject({
        document: serializeDocument(doc),
        __shareDbDoc: doc
      })
    })

    describe('doc of data type', () => {

      beforeEach(() => {
        ReferencesElement = EditPageForm.mock.calls[0][0].References
        CollaboratorsElement = EditPageForm.mock.calls[0][0].Collaborators
        PreviewElement = EditPageForm.mock.calls[0][0].Preview
      })

      describe('collaborators', () => {

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

      it('should not contain references if doc type is not equal to vis', () => {
        expect(ReferencesElement).toBeNull()
      })

      it('should not contain preview if doc type is not equal to vis', () => {
        expect(PreviewElement).toBeNull()
      })

    })

    describe('doc of vis type', () => {

      beforeEach(() => {
        doc.data.type = 'vis'
        sut.setProps({doc: doc})
        ReferencesElement = EditPageForm.mock.calls[2][0].References
        PreviewElement = EditPageForm.mock.calls[2][0].Preview
      })

      describe('references', () => {

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

      describe('preview', () => {

        it('should be a runner', () => {
          expect(PreviewElement.type).toBe(Runner)
        })

        it('should render runner with content, references adn references documents', () => {
          const serialized = serializeDocument(doc)
          expect(PreviewElement.props).toMatchObject({
            content: serialized.content,
            references: serialized.references,
            referenceDocuments: referenceDocs.map(serializeDocument)
          })
        })

      })

    })

  })

  it('should have fullscreen button', () => {
    expect(sut.find(FullscreenButton).exists()).toBeTruthy()
  })

  describe('delete document', () => {

    it('should show delete confirmation modal on delete button click', () => {
      sut.find(nodeSelector('delete-button')).at(0).simulate('click')
      expect(setState).toHaveBeenCalledWith({
        showDeleteConfirmModal: true
      })
    })

    it('should notify about deletion', () => {
      sut.find(DeleteConfirmModal).prop('onDelete')()
      expect(onDocumentDelete).toHaveBeenCalled()
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

      let username

      beforeEach(() => {
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
