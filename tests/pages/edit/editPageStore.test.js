import { observe } from 'mobx'
jest.mock('../../../src/pages/edit/getProfileByUsername')
import getProfileByUsername from '../../../src/pages/edit/getProfileByUsername'
import EditPageStore from '../../../src/pages/edit/editPageStore'

describe('edit page store', () => {
  let sut
  let documentStore
  let documentId
  let document

  beforeEach(() => {
    documentId = String(Math.random())
    document = Symbol('document')
    documentStore = {
      getById: jest.fn(id => (id === documentId ? document : null)),

      submitCollaboratorAddToDocument: jest.fn(),
      submitCollaboratorRemoveToDocument: jest.fn(),

      submitReferenceAddToDocument: jest.fn(),
      submitReferenceRemoveToDocument: jest.fn(),

      submitTitleChangeToDocument: jest.fn(),
      submitDescriptionChangeToDocument: jest.fn(),
      submitContentChangeToDocument: jest.fn()
    }
    sut = EditPageStore({ documentStore, documentId })
  })

  it('should submit title changes', () => {
    const title = String(Math.random())
    sut.submitTitleChange(title)
    expect(documentStore.submitTitleChangeToDocument).toHaveBeenCalledWith(
      document,
      title
    )
  })

  it('should submit description changes', () => {
    const description = String(Math.random())
    sut.submitDescriptionChange(description)
    expect(documentStore.submitDescriptionChangeToDocument).toHaveBeenCalledWith(
      document,
      description
    )
  })

  it('should submit content changes', () => {
    const content = String(Math.random())
    sut.submitContentChange(content)
    expect(documentStore.submitContentChangeToDocument).toHaveBeenCalledWith(
      document,
      content
    )
  })

  describe('show and close add collaborator modal', () => {
    beforeEach(() => {
      sut.showAddCollaboratorModal()
    })

    it('should show', () => {
      expect(sut.pageState.showAddCollaboratorModal).toBeTruthy()
    })

    it('should close', () => {
      sut.closeAddCollaboratorModal()
      expect(sut.pageState.showAddCollaboratorModal).toBeFalsy()
    })
  })

  describe('submit collaborator', () => {
    let username
    let profile
    let pageStateChanges

    describe('entered username exists', () => {
      beforeEach(async () => {
        sut.pageState.showAddCollaboratorModal = true
        sut.pageState.profileNotFound = true

        pageStateChanges = []
        observe(sut.pageState, changes => {
          pageStateChanges.push(changes)
        })

        profile = { id: String(Math.random()) }
        getProfileByUsername.mockReturnValueOnce(
          Promise.resolve(profile)
        )

        username = String(Math.random())
        await sut.submitCollaboratorAdd(username)
      })

      it('should be in loading collaborator profile state', () => {
        expect(pageStateChanges[0].name).toEqual(
          'loadingCollaboratorProfile'
        )
        expect(pageStateChanges[0].newValue).toBeTruthy()
      })

      it('should sumbit collaborator changes', () => {
        expect(
          documentStore.submitCollaboratorAddToDocument
        ).toHaveBeenCalledWith(document, profile.id)
      })

      it('should close add collaborator modal', () => {
        expect(pageStateChanges[1].name).toEqual(
          'showAddCollaboratorModal'
        )
        expect(pageStateChanges[1].newValue).toBeFalsy()
      })

      it('should stop loading collaborator profiles', () => {
        expect(pageStateChanges[2].name).toEqual(
          'loadingCollaboratorProfile'
        )
        expect(pageStateChanges[2].newValue).toBeFalsy()
      })

      it('should not be in profile not found state', () => {
        expect(pageStateChanges[3].name).toEqual('profileNotFound')
        expect(pageStateChanges[3].newValue).toBeFalsy()
      })
    })

    describe('entered username does not exist', () => {
      beforeEach(async () => {
        pageStateChanges = []
        observe(sut.pageState, changes => {
          pageStateChanges.push(changes)
        })

        getProfileByUsername.mockReturnValueOnce(
          Promise.reject(new Error())
        )

        username = String(Math.random())
        await sut.submitCollaboratorAdd(username)
      })

      it('should be in loading collaborator profile state', () => {
        expect(pageStateChanges[0].name).toEqual(
          'loadingCollaboratorProfile'
        )
        expect(pageStateChanges[0].newValue).toBeTruthy()
      })

      it('should not close add collaborator modal', () => {
        expect(pageStateChanges[1].name).toEqual(
          'showAddCollaboratorModal'
        )
        expect(pageStateChanges[1].newValue).toBeTruthy()
      })

      it('should stop loading collaborator profiles', () => {
        expect(pageStateChanges[2].name).toEqual(
          'loadingCollaboratorProfile'
        )
        expect(pageStateChanges[2].newValue).toBeFalsy()
      })

      it('should be in profile not found state', () => {
        expect(pageStateChanges[3].name).toEqual('profileNotFound')
        expect(pageStateChanges[3].newValue).toBeTruthy()
      })
    })
  })

  it('should submit collaborator removal', () => {
    const userId = String(Math.random())
    sut.submitCollaboratorRemove(userId)
    expect(documentStore.submitCollaboratorRemoveToDocument).toHaveBeenCalledWith(document, userId)
  })

  describe('add reference modal', () => {
    beforeEach(() => {
      sut.showAddRefrenceModal()
    })

    it('should show', () => {
      expect(sut.pageState.showAddRefrenceModal).toBeTruthy()
    })

    it('should close', () => {
      sut.closeAddReferenceModal()
      expect(sut.pageState.showAddRefrenceModal).toBeFalsy()
    })

    describe('reference addition', () => {
      let filename
      let referenceId

      beforeEach(() => {
        filename = String(Math.random())
        referenceId = String(Math.random())
        sut.submitReferenceAdd(filename, referenceId)
      })

      it('should add reference and close', () => {
        expect(
          documentStore.submitReferenceAddToDocument
        ).toHaveBeenCalledWith(document, filename, referenceId)
      })

      it('should close modal', () => {
        expect(sut.pageState.showAddRefrenceModal).toBeFalsy()
      })
    })
  })

  it('should submit reference removal', () => {
    const referenceId = String(Math.random())
    sut.submitReferenceRemove(referenceId)
    expect(documentStore.submitReferenceRemoveToDocument).toHaveBeenCalledWith(document, referenceId)
  })

  describe('delete document', () => {
    beforeEach(() => {
      sut.showDeleteConfirmModal()
    })

    it('should show', () => {
      expect(sut.pageState.showDeleteConfirmModal).toBeTruthy()
    })

    it('should close', () => {
      sut.closeDeleteConfirmModal()
      expect(sut.pageState.showDeleteConfirmModal).toBeFalsy()
    })
  })
})
