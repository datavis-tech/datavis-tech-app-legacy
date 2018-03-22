import React from 'react'
import { mount } from 'enzyme'

import { EARLY_ADOPTER } from '../../../src/server/stripe/plans'

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
  addReference, removeReference
} from '../../../src/db/actions'

jest.mock('../../../src/pages/edit/getProfileByUsername')
import getProfileByUsername from '../../../src/pages/edit/getProfileByUsername'

import { serializeDocument } from '../../../src/db/serializers'

jest.mock('../../../src/pages/edit/addCollaboratorModal', () => () => null)
import AddCollaboratorModal from '../../../src/pages/edit/addCollaboratorModal'

jest.mock('../../../src/pages/edit/addReferenceModal', () => () => null)
import AddReferenceModal from '../../../src/pages/edit/addReferenceModal'

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
  let owner
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

    owner = String(Math.random())
    doc = fakeDoc({
      data: {
        owner,
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

    describe('can switch privacy', () => {

      it('should not allow switch privacy if user is not logged in', () => {
        sut.setProps({user: undefined})
        expect(sut.find(EditPageForm).prop('allowPrivacySwitching')).toBeFalsy()
      })

      it('should not allow to switch privacy if user is not early adopter', () => {
        sut.setProps({user: { id: owner, subscriptionPlan: String(Math.random()) }})
        expect(sut.find(EditPageForm).prop('allowPrivacySwitching')).toBeFalsy()
      })

      it('should not allow to switch privacy if user is early adopter but is not owner', () => {
        sut.setProps({user: { id: String(Math.random()), subscriptionPlan: EARLY_ADOPTER }})
        expect(sut.find(EditPageForm).prop('allowPrivacySwitching')).toBeFalsy()
      })

      it('should allow to switch privacy if user is docuemnt owner and he is early adopter', () => {
        sut.setProps({user: { id: owner, subscriptionPlan: EARLY_ADOPTER }})
        expect(sut.find(EditPageForm).prop('allowPrivacySwitching')).toBeTruthy()
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

  describe('add reference modal', () => {

    let AddReferenceModalWrapper

    beforeEach(() => {
      AddReferenceModalWrapper = sut.find(AddReferenceModal)
    })

    it('should be on the page', () => {
      expect(AddReferenceModalWrapper.exists()).toBeTruthy()
    })

    it('should close itself when user closes modal', () => {
      sut.setState({
        showAddReferenceModal: true
      })
      AddReferenceModalWrapper.prop('onClose')()
      expect(sut.state('showAddReferenceModal')).toBeFalsy()
    })

    describe('on collaborator submit', () => {

      let filename
      let id

      beforeEach(() => {
        filename = String(Math.random())
        id = String(Math.random())
      })

      beforeEach(async (done) => {
        AddReferenceModalWrapper.prop('onReferenceSubmit')(filename, id)
        sut.update()
        done()
      })

      it('should add reference', () => {
        expect(addReference).toHaveBeenCalledWith(doc, filename, id)
      })

      it('should close modal', () => {
        expect(setState.mock.calls[0][0]).toMatchObject({
          showAddReferenceModal: false
        })
      })

    })

  })

})
