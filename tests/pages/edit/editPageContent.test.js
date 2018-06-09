import React from 'react'
import { mount } from 'enzyme'

jest.mock('../../../src/pages/edit/editPageForm')
import EditPageForm from '../../../src/pages/edit/editPageForm'

jest.mock('../../../src/pages/edit/editPageStore')
import EditPageStore from '../../../src/pages/edit/editPageStore'

import fakeUser from '../../utils/fakeUser'
import nodeSelector from '../../utils/nodeSelector'

jest.mock('../../../src/pages/edit/addCollaboratorModal', () => () => null)
import AddCollaboratorModal from '../../../src/pages/edit/addCollaboratorModal'

jest.mock('../../../src/pages/edit/addReferenceModal', () => () => null)
import AddReferenceModal from '../../../src/pages/edit/addReferenceModal'

import DeleteConfirmModal from '../../../src/pages/edit/deleteConfirmModal'

import Collaborators from '../../../src/pages/edit/collaborators'
import References from '../../../src/pages/edit/references'
import Runner from '../../../src/components/runner/runner'
import FullscreenButton from '../../../src/pages/views/slots/fullscreenButton'

import EditPageContent from '../../../src/pages/edit/editPageContent'

describe('edit page content', () => {
  let sut
  let props
  let id
  let user
  let documentStore
  let editPageStore

  let canSwitchPrivacy
  let onDocumentDelete

  beforeEach(() => {
    id = String(Math.random())
    user = fakeUser()

    documentStore = {}
    onDocumentDelete = jest.fn()

    props = { id, user, documentStore, onDocumentDelete }

    EditPageForm.mockImplementation(() => null)

    canSwitchPrivacy = String(Math.random())

    editPageStore = {
      document: {
        id,
        title: Symbol('title'),
        collaborators: Symbol('collaborators'),
        references: Symbol('References'),
        isVisualization: {
          get: jest.fn()
        }
      },
      references: Symbol('References'),
      pageState: {
        deletingDocument: Symbol('deletingDocument'),
        showDeleteConfirmModal: Symbol('showDeleteConfirmModal'),

        showAddCollaboratorModal: Symbol('showAddCollaboratorModal'),
        loadingCollaboratorProfile: Symbol(
          'loadingCollaboratorProfile'
        ),
        profileNotFound: Symbol('profileNotFound')
      },

      canSwitchPrivacy: {
        get: () => canSwitchPrivacy
      },

      submitPrivacyChange: jest.fn(),
      submitTitleChange: jest.fn(),
      submitDescriptionChange: jest.fn(),
      submitContentChange: jest.fn(),

      showAddCollaboratorModal: jest.fn(),
      submitCollaboratorRemove: jest.fn(),
      submitCollaboratorAdd: jest.fn(),
      closeAddCollaboratorModal: jest.fn(),

      showAddRefrenceModal: jest.fn(),
      submitReferenceRemove: jest.fn(),
      closeAddReferenceModal: jest.fn(),
      submitReferenceAdd: jest.fn(),

      showDeleteConfirmModal: jest.fn(),
      closeDeleteConfirmModal: jest.fn(),
      submitDocumentDelete: jest.fn()
    }
    EditPageStore.mockReturnValue(editPageStore)

    sut = mount(<EditPageContent {...props} />)
  })

  afterEach(() => {
    EditPageForm.mockClear()
  })

  it('should create edit page store', () => {
    expect(EditPageStore).toHaveBeenCalledWith({
      user,
      documentId: id,
      documentStore,
      onDocumentDelete
    })
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
        allowPrivacySwitching: canSwitchPrivacy,
        document: editPageStore.document,
        onPrivacyChange: editPageStore.submitPrivacyChange,
        onTitleChange: editPageStore.submitTitleChange,
        onDescriptionChange: editPageStore.submitDescriptionChange,
        onContentChange: editPageStore.submitContentChange
      })
    })

    describe('doc of data type', () => {
      beforeEach(() => {
        editPageStore.document.isVisualization.get.mockReturnValue(
          false
        )
        sut.setProps({})

        ReferencesElement = EditPageForm.mock.calls[0][0].References
        CollaboratorsElement =
                    EditPageForm.mock.calls[0][0].Collaborators
        PreviewElement = EditPageForm.mock.calls[0][0].Preview
      })

      it('should render edit form with collaborators', () => {
        expect(CollaboratorsElement.type).toBe(Collaborators)
        expect(CollaboratorsElement.props).toMatchObject({
          ids: editPageStore.document.collaborators,
          onCollaboratorAdd: editPageStore.showAddCollaboratorModal,
          onCollaboratorRemove: editPageStore.submitCollaboratorRemove
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
        editPageStore.document.isVisualization.get.mockReturnValue(
          true
        )
        sut.setProps({})

        ReferencesElement = EditPageForm.mock.calls[1][0].References
        CollaboratorsElement =
                    EditPageForm.mock.calls[1][0].Collaborators
        PreviewElement = EditPageForm.mock.calls[1][0].Preview
      })

      it('should render edit form with collaborators', () => {
        expect(CollaboratorsElement.type).toBe(Collaborators)
        expect(CollaboratorsElement.props).toMatchObject({
          ids: editPageStore.document.collaborators,
          onCollaboratorAdd: editPageStore.showAddCollaboratorModal,
          onCollaboratorRemove: editPageStore.submitCollaboratorRemove
        })
      })

      it('should render edit form with references', () => {
        expect(ReferencesElement.type).toBe(References)
        expect(ReferencesElement.props).toMatchObject({
          references: editPageStore.document.references,
          onReferenceAdd: editPageStore.showAddRefrenceModal,
          onReferenceRemove: editPageStore.submitReferenceRemove
        })
      })

      it('should render runner with content, references adn references documents', () => {
        expect(PreviewElement.type).toBe(Runner)
        expect(PreviewElement.props).toMatchObject({
          content: editPageStore.document.content,
          references: editPageStore.document.references,
          referenceDocuments: editPageStore.references
        })
      })
    })
  })

  it('should have fullscreen button', () => {
    expect(sut.find(FullscreenButton).exists()).toBeTruthy()
  })

  describe('delete document', () => {
    it('should show delete confirmation modal on delete button click', () => {
      expect(
        sut
          .find(nodeSelector('delete-button'))
          .at(0)
          .props()
      ).toMatchObject({
        disabled: editPageStore.pageState.deletingDocument,
        loading: editPageStore.pageState.deletingDocument,
        onClick: editPageStore.showDeleteConfirmModal
      })
    })

    it('should contain delete confirmation modal', () => {
      expect(sut.find(DeleteConfirmModal).props()).toMatchObject({
        show: editPageStore.pageState.showDeleteConfirmModal,
        title: editPageStore.document.title,
        onClose: editPageStore.closeDeleteConfirmModal,
        onDelete: editPageStore.submitDocumentDelete
      })
    })
  })

  it('should contain add collaborator modal on the page', () => {
    expect(sut.find(AddCollaboratorModal).props()).toMatchObject({
      show: editPageStore.pageState.showAddCollaboratorModal,
      loading: editPageStore.pageState.loadingCollaboratorProfile,
      notFound: editPageStore.pageState.profileNotFound,
      onClose: editPageStore.closeAddCollaboratorModal,
      onCollaboratorSubmit: editPageStore.submitCollaboratorAdd
    })
  })

  it('should contain add reference modal on the page', () => {
    expect(sut.find(AddReferenceModal).props()).toMatchObject({
      userId: user.id,
      show: editPageStore.pageState.showAddRefrenceModal,
      onClose: editPageStore.closeAddReferenceModal,
      onReferenceSubmit: editPageStore.submitReferenceAdd
    })
  })

})
