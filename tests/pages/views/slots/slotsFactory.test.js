import Header from '../../../../src/pages/views/slots/header'
import Description from '../../../../src/pages/views/slots/description'
import OwnerAvatarLink from '../../../../src/pages/views/slots/ownerAvatarLink'
import DocumentPreviewList from '../../../../src/pages/views/slots/documentPreviewList'
import EditButton from '../../../../src/pages/views/slots/editButton'
import ForkButton from '../../../../src/pages/views/slots/forkButton'

import sut from '../../../../src/pages/views/slots/slotsFactory'

describe('slots factory', () => {

  let slots

  let props

  let id
  let user
  let ownerProfile
  let doc
  let referenceDocs
  let forkedFrom
  let onFork

  beforeEach(() => {
    id = Symbol('id')
    user = Symbol('user')
    ownerProfile = Symbol('ownerProfile')
    doc = Symbol('doc')
    referenceDocs = Symbol('referenceDocs')
    forkedFrom = Symbol('forkedFrom')
    onFork = Symbol('onFork')
    props = {id, user, ownerProfile, doc, referenceDocs, forkedFrom, onFork}
  })

  describe('defaults', () => {

    beforeEach(() => {
      slots = sut(props)
    })

    it('should contain header', () => {
      expect(slots.Header.type).toBe(Header)
      expect(slots.Header.props).toMatchObject({doc})
    })

    it('should contain description', () => {
      expect(slots.Description.type).toBe(Description)
      expect(slots.Description.props).toMatchObject({doc})
    })

    it('should contain forked from', () => {
      expect(slots.ForkedFrom.type).toBe(DocumentPreviewList)
      expect(slots.ForkedFrom.props).toMatchObject({
        title: 'Forked from',
        documents: [forkedFrom]
      })
    })

    it('should contain avatar', () => {
      expect(slots.Avatar.type).toBe(OwnerAvatarLink)
      expect(slots.Avatar.props).toMatchObject({user: ownerProfile})
    })

    it('should contain edit button', () => {
      expect(slots.EditButton.type).toBe(EditButton)
      expect(slots.EditButton.props).toMatchObject({id})
    })

    it('should contain fork button', () => {
      expect(slots.ForkButton.type).toBe(ForkButton)
      expect(slots.ForkButton.props).toMatchObject({onFork})
    })

  })

  describe('overrides', () => {

    let CustomHeader
    let CustomContent
    let CustomDescription
    let CustomReferences
    let CustomForkedFrom
    let CustomAvatar
    let CustomEditButton
    let CustomForkButton

    beforeEach(() => {
      CustomHeader = Symbol('Header')
      CustomContent = Symbol('Content')
      CustomDescription = Symbol('Description')
      CustomReferences = Symbol('References')
      CustomForkedFrom = Symbol('ForkedFrom')
      CustomAvatar = Symbol('Avatar')
      CustomEditButton = Symbol('EditButton')
      CustomForkButton = Symbol('ForkButton')

      slots = sut(props, {
        Header: CustomHeader,
        Content: CustomContent,
        Description: CustomDescription,
        References: CustomReferences,
        ForkedFrom: CustomForkedFrom,
        Avatar: CustomAvatar,
        EditButton: CustomEditButton,
        ForkButton: CustomForkButton
      })

    })

    it('should allow to override header', () => {
      expect(slots.Header).toBe(CustomHeader)
    })

    it('should allow to override ', () => {
      expect(slots.Content).toBe(CustomContent)
    })

    it('should allow to override ', () => {
      expect(slots.Description).toBe(CustomDescription)
    })

    it('should allow to override ', () => {
      expect(slots.References).toBe(CustomReferences)
    })

    it('should allow to override ', () => {
      expect(slots.ForkedFrom).toBe(CustomForkedFrom)
    })

    it('should allow to override ', () => {
      expect(slots.Avatar).toBe(CustomAvatar)
    })

    it('should allow to override ', () => {
      expect(slots.EditButton).toBe(CustomEditButton)
    })

    it('should allow to override ', () => {
      expect(slots.ForkButton).toBe(CustomForkButton)
    })

  })
})
