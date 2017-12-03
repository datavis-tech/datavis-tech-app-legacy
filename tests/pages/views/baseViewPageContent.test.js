import React from 'react'
import { mount } from 'enzyme'

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
    referenceDocs = Symbol('referenceDocs')
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

    it('should render layout', () => {
      expect(sut.find(Layout).props()).toMatchObject({
        id: props.id,
        doc: props.doc,
        onFork: props.onFork,
        ownerProfile: profile.data,
        referenceDocs,
        forkedFrom
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
        id: props.id,
        doc: props.doc,
        onFork: props.onFork,
        ownerProfile: null,
        referenceDocs: [],
        forkedFrom: null
      })
    })

  })

})
