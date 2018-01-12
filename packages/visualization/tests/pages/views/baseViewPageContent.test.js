import React from 'react'
import { mount } from 'enzyme'

jest.mock('../../../src/db/serializers')
import { serializeDocument } from '../../../src/db/serializers'

import Subscription from '../../../src/components/subscription'

import fakeUser from '../../utils/fakeUser'
import fakeDoc from '../../utils/fakeDoc'
import fakeSubscription from '../../utils/fakeSubscription'

import BaseViewPageContent from '../../../src/pages/views/baseViewPageContent'

describe('base view page content', () => {

  let sut
  let props
  let Layout
  let profile
  let referenceDocument
  let referenceDocs
  let forkedFrom

  beforeAll(() => {
    process.browser = true
  })

  afterAll(() => {
    delete process.browser
  })

  beforeEach(() => {

    Layout = () => null

    profile = fakeUser()
    referenceDocument = Symbol('referenceDocs')
    referenceDocs = [referenceDocument]
    forkedFrom = fakeDoc()

    props = {
      id: Symbol('id'),
      doc: Symbol('doc'),
      onFork: Symbol('onFork'),
      subscription: fakeSubscription(({onUpdate}) => onUpdate({profile, referenceDocs, forkedFrom})),
      Layout
    }

    sut = mount(<BaseViewPageContent {...props} />)
  })

  it('should render subscription', () => {
    expect(sut.find(Subscription).prop('subscription')).toBe(props.subscription)
  })

  describe('when profile and referenced docs are present', () => {

    let serialized

    beforeEach(() => {
      serialized = String(Math.random())
      serializeDocument.mockReturnValue(serialized)
      sut.setProps({})
    })

    it('should serialize document', () => {
      expect(serializeDocument).toHaveBeenCalledWith(props.doc)
    })

    it('should serialize referenced documents', () => {
      expect(serializeDocument).toHaveBeenCalledWith(referenceDocument, 0, referenceDocs)
    })

    it('should serialize forked from', () => {
      expect(serializeDocument).toHaveBeenCalledWith(forkedFrom)
    })

    it('should render layout', () => {
      expect(sut.find(Layout).props()).toMatchObject({
        id: props.id,
        document: serialized,
        onFork: props.onFork,
        ownerProfile: profile.data,
        referenceDocuments: [serialized],
        forkedFrom: serialized
      })
    })

  })

  describe('when profile and referenced docs are not present', () => {

    beforeEach(() => {

      props.subscription = fakeSubscription()
      sut = mount(<BaseViewPageContent {...props} />)

    })

    it('should render layout', () => {
      expect(sut.find(Layout).props()).toMatchObject({
        referenceDocuments: [],
        forkedFrom: null
      })
    })

  })

})
