import Header from '../../../../src/pages/views/slots/header'
import Description from '../../../../src/pages/views/slots/description'
import OwnerAvatarLink from '../../../../src/pages/views/slots/ownerAvatarLink'
import DocumentPreviewList from '../../../../src/pages/views/slots/documentPreviewList'
import EditButton from '../../../../src/pages/views/slots/editButton'
import ForkButton from '../../../../src/pages/views/slots/forkButton'
import EmbedButton from '../../../../src/pages/views/slots/embedButton'
import ExportButton from '../../../../src/pages/views/slots/exportButton'

import sut from '../../../../src/pages/views/slots/slotsFactory'

describe('slots factory', () => {

  let slots

  let props

  let id
  let user
  let ownerProfile
  let document
  let forkedFrom
  let onFork

  beforeEach(() => {
    id = Symbol('id')
    user = Symbol('user')
    ownerProfile = Symbol('ownerProfile')
    document = {
      id: String(Math.random()),
      title: String(Math.random()),
      description: String(Math.random()),
      content: String(Math.random())
    }
    forkedFrom = Symbol('forkedFrom')
    onFork = Symbol('onFork')
    props = {id, user, ownerProfile, document, forkedFrom, onFork}
  })

  describe('defaults', () => {

    beforeEach(() => {
      slots = sut(props)
    })

    it('should contain header', () => {
      expect(slots.Header.type).toBe(Header)
      expect(slots.Header.props).toMatchObject({title: document.title})
    })

    it('should contain description', () => {
      expect(slots.Description.type).toBe(Description)
      expect(slots.Description.props).toMatchObject({description: document.description})
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

    it('should contain embed button', () => {
      expect(slots.EmbedButton.type).toBe(EmbedButton)
      expect(slots.EmbedButton.props).toMatchObject({id})
    })

    it('should contain export button', () => {
      expect(slots.ExportButton.type).toBe(ExportButton)
      expect(slots.ExportButton.props).toMatchObject({id})
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
    let CustomEmbedButton
    let CustomExportButton

    beforeEach(() => {
      CustomHeader = Symbol('Header')
      CustomContent = Symbol('Content')
      CustomDescription = Symbol('Description')
      CustomReferences = Symbol('References')
      CustomForkedFrom = Symbol('ForkedFrom')
      CustomAvatar = Symbol('Avatar')
      CustomEditButton = Symbol('EditButton')
      CustomForkButton = Symbol('ForkButton')
      CustomEmbedButton = Symbol('EmbedButton')
      CustomExportButton = Symbol('ExportButton')

      slots = sut(props, {
        Header: CustomHeader,
        Content: CustomContent,
        Description: CustomDescription,
        References: CustomReferences,
        ForkedFrom: CustomForkedFrom,
        Avatar: CustomAvatar,
        EditButton: CustomEditButton,
        ForkButton: CustomForkButton,
        EmbedButton: CustomEmbedButton,
        ExportButton: CustomExportButton
      })

    })

    it('should allow to override header', () => {
      expect(slots.Header).toBe(CustomHeader)
    })

    it('should allow to override content', () => {
      expect(slots.Content).toBe(CustomContent)
    })

    it('should allow to override description', () => {
      expect(slots.Description).toBe(CustomDescription)
    })

    it('should allow to override references', () => {
      expect(slots.References).toBe(CustomReferences)
    })

    it('should allow to override forked from', () => {
      expect(slots.ForkedFrom).toBe(CustomForkedFrom)
    })

    it('should allow to override avatar', () => {
      expect(slots.Avatar).toBe(CustomAvatar)
    })

    it('should allow to override edit button', () => {
      expect(slots.EditButton).toBe(CustomEditButton)
    })

    it('should allow to override fork button', () => {
      expect(slots.ForkButton).toBe(CustomForkButton)
    })

    it('should allow to override embed button', () => {
      expect(slots.EmbedButton).toBe(CustomEmbedButton)
    })

    it('should allow to override export button', () => {
      expect(slots.ExportButton).toBe(CustomExportButton)
    })

  })
})
