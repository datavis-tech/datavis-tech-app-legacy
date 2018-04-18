import React from 'react'
import { shallow } from 'enzyme'

import ViewPageLayout from '../../../../src/pages/views/viewPageLayout'
import DataViewerProvider from '../../../../src/pages/views/data/dataViewerProvider'

jest.mock('../../../../src/pages/views/slots')
import { createSlots, DocumentPreviewList } from '../../../../src/pages/views/slots'

import DataViewPageLayout from '../../../../src/pages/views/data/layout'

describe('data page layout', () => {

  let sut
  let props
  let slots

  beforeEach(() => {

    createSlots.mockReset()

    props = {
      id: Symbol('id'),
      document: {content: Symbol('content')},
      ownerProfile: Symbol('profile'),
      forkedFrom: Symbol('forkedFrom'),
      referenceDocuments: Symbol('referenceDocs'),
      onFork: Symbol('onFork')
    }
    slots = {
      someSlot: Symbol('slot')
    }

    createSlots.mockReturnValue(slots)

    sut = shallow(<DataViewPageLayout {...props} />)

  })

  describe('slots creation', () => {

    let slotsParams
    let overrideSlots

    beforeEach(() => {
      slotsParams = createSlots.mock.calls[0][0]
      overrideSlots = createSlots.mock.calls[0][1]
    })

    it('should create slots based on passed parameters', () => {
      expect(slotsParams).toMatchObject({
        id: props.id,
        document: props.document,
        ownerProfile: props.ownerProfile,
        forkedFrom: props.forkedFrom,
        onFork: props.onFork
      })
    })

    it('should override content', () => {
      expect(overrideSlots.Content.type).toBe(DataViewerProvider)
      expect(overrideSlots.Content.props).toMatchObject({
        document: props.document
      })
    })

    it('should override references', () => {
      expect(overrideSlots.References.type).toBe(DocumentPreviewList)
      expect(overrideSlots.References.props).toMatchObject({
        title: 'Visualizations',
        documents: props.referenceDocuments
      })
    })

    it('should disable embed button', () => {
      expect(overrideSlots.EmbedButton).toBeNull()
    })

    it('should disable export button', () => {
      expect(overrideSlots.ExportButton).toBeNull()
    })

    it('should disable fullsreen button', () => {
      expect(overrideSlots.FullscreenButton).toBeNull()
    })

  })

  it('should render view page layout with created slots', () => {
    expect(sut.find(ViewPageLayout).props()).toMatchObject(slots)
  })

})
