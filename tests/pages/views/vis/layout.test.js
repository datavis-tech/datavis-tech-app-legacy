import React from 'react'
import { shallow } from 'enzyme'

import ViewPageLayout from '../../../../src/pages/views/viewPageLayout'
import Runner from '../../../../src/components/runner/runner'

jest.mock('../../../../src/pages/views/slots')
import { createSlots, DocumentPreviewList } from '../../../../src/pages/views/slots'

import VisViewPageLayout from '../../../../src/pages/views/vis/layout'

describe('vis page layout', () => {

  let sut
  let props
  let slots

  beforeEach(() => {

    createSlots.mockReset()

    props = {
      id: Symbol('id'),
      doc: Symbol('doc'),
      ownerProfile: Symbol('profile'),
      forkedFrom: Symbol('forkedFrom'),
      referenceDocs: Symbol('referenceDocs'),
      onFork: Symbol('onFork')
    }
    slots = {
      someSlot: Symbol('slot')
    }

    createSlots.mockReturnValue(slots)

    sut = shallow(<VisViewPageLayout {...props} />)

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
        doc: props.doc,
        ownerProfile: props.ownerProfile,
        forkedFrom: props.forkedFrom,
        onFork: props.onFork
      })
    })

    it('should override content', () => {
      expect(overrideSlots.Content.type).toBe(Runner)
      expect(overrideSlots.Content.props).toMatchObject({
        doc: props.doc,
        referenceDocs: props.referenceDocs
      })
    })

    it('should override references', () => {
      expect(overrideSlots.References.type).toBe(DocumentPreviewList)
      expect(overrideSlots.References.props).toMatchObject({
        title: 'Data',
        documents: props.referenceDocs
      })
    })

  })

  it('should render view page layout with created slots', () => {
    expect(sut.find(ViewPageLayout).props()).toMatchObject(slots)
  })

})
