import { observable, computed, action, runInAction } from 'mobx'
import { EARLY_ADOPTER } from '../../server/stripe/plans'
import getProfileByUsername from './getProfileByUsername'

export default function EditPageStore ({ documentStore, documentId, user, onDocumentDelete }) {
  const aDocument = documentStore.getById(documentId)

  const pageState = observable({
    showDeleteConfirmModal: false,
    deletingDocument: false,
    showAddCollaboratorModal: false,
    showAddRefrenceModal: false,
    loadingCollaboratorProfile: false,
    profileNotFound: false
  })

  return {
    document: aDocument,

    // TODO test
    references: computed(() =>
      aDocument.references.map(ref => documentStore.getById(ref.id))
    ),

    // TODO test
    canSwitchPrivacy: computed(() => {
      if (user) {
        return (
          aDocument.owner === user.id &&
                    user.subscriptionPlan === EARLY_ADOPTER
        )
      }

      return false
    }),

    pageState,

    submitTitleChange: action(submitTitleChange),
    submitDescriptionChange: action(submitDescriptionChange),
    submitContentChange: action(submitContentChange),

    showAddCollaboratorModal: action(showAddCollaboratorModal),
    closeAddCollaboratorModal: action(closeAddCollaboratorModal),
    submitCollaboratorAdd: action(submitCollaboratorAdd),
    submitCollaboratorRemove: action(submitCollaboratorRemove),

    showAddRefrenceModal: action(showAddRefrenceModal),
    closeAddReferenceModal: action(closeAddReferenceModal),
    submitReferenceAdd: action(submitReferenceAdd),
    submitReferenceRemove: action(submitReferenceRemove),

    showDeleteConfirmModal: action(showDeleteConfirmModal),
    closeDeleteConfirmModal: action(closeDeleteConfirmModal),
    submitDocumentDelete: action(submitDocumentDelete)
  }

  function submitTitleChange (title) {
    documentStore.submitTitleChangeToDocument(aDocument, title)
  }

  function submitDescriptionChange (description) {
    documentStore.submitDescriptionChangeToDocument(aDocument, description)
  }

  function submitContentChange (content) {
    documentStore.submitContentChangeToDocument(aDocument, content)
  }

  function showAddCollaboratorModal () {
    pageState.showAddCollaboratorModal = true
  }

  function closeAddCollaboratorModal () {
    pageState.showAddCollaboratorModal = false
  }

  async function submitCollaboratorAdd (username) {
    runInAction(() => (pageState.loadingCollaboratorProfile = true))

    try {
      const profile = await getProfileByUsername(username)

      documentStore.submitCollaboratorAddToDocument(aDocument, profile.id)

      runInAction(() => {
        pageState.showAddCollaboratorModal = false
        pageState.loadingCollaboratorProfile = false
        pageState.profileNotFound = false
      })
    } catch (e) {
      runInAction(() => {
        pageState.showAddCollaboratorModal = true
        pageState.loadingCollaboratorProfile = false
        pageState.profileNotFound = true
      })
    }
  }

  function submitCollaboratorRemove (userId) {
    documentStore.submitCollaboratorRemoveToDocument(aDocument, userId)
  }

  function showAddRefrenceModal () {
    pageState.showAddRefrenceModal = true
  }

  function closeAddReferenceModal () {
    pageState.showAddRefrenceModal = false
  }

  function submitReferenceAdd (filename, referenceId) {
    documentStore.submitReferenceAddToDocument(
      aDocument,
      filename,
      referenceId
    )
    closeAddReferenceModal()
  }

  function submitReferenceRemove (referenceId) {
    documentStore.submitReferenceRemoveToDocument(aDocument, referenceId)
  }

  function showDeleteConfirmModal () {
    pageState.showDeleteConfirmModal = true
  }

  function closeDeleteConfirmModal () {
    pageState.showDeleteConfirmModal = false
  }

  // TODO tests
  async function submitDocumentDelete () {
    runInAction(() => {
      pageState.showDeleteConfirmModal = false
      pageState.deletingDocument = true
    })
    try {
      await documentStore.submitDocumentDelete(document)
      onDocumentDelete()
    } catch (e) {
      console.log(e)
    }
  }
}
