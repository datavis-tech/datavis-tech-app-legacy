import React from 'react'
import { shallow } from 'enzyme'

import fakeDoc from '../../../utils/fakeDoc'

jest.mock('../../../../src/db/subscriptions/profileSubscription')
jest.mock('../../../../src/db/subscriptions/documentSubscriptions')
jest.mock('../../../../src/db/subscriptions/documentSubscription')
jest.mock('../../../../src/db/subscriptions/compositeSubscription')

import ProfileSubscription from '../../../../src/db/subscriptions/profileSubscription'
import ReferencesSubscription from '../../../../src/db/subscriptions/documentSubscriptions'
import ForkedFromSubscription from '../../../../src/db/subscriptions/documentSubscription'
import CompositeSubscription from '../../../../src/db/subscriptions/compositeSubscription'

import BaseViewPageContent from '../../../../src/pages/views/baseViewPageContent'
import VisViewPageLayout from '../../../../src/pages/views/vis/layout'
import VisViewPageContent from '../../../../src/pages/views/vis/content'

describe('vis page content', () => {

  let sut
  let props
  let id
  let doc
  let onFork
  let referenceDocs

  let profileSubscription
  let referencesSubscription
  let forkedFromSubscription
  let compositeSubscription

  beforeEach(() => {

    profileSubscription = Symbol('profileSubscription')
    referencesSubscription = Symbol('referencesSubscription')
    forkedFromSubscription = Symbol('forkedFromSubscription')
    compositeSubscription = Symbol('compositeSubscription')

    ProfileSubscription.mockReturnValue(profileSubscription)
    ReferencesSubscription.mockReturnValue(referencesSubscription)
    ForkedFromSubscription.mockReturnValue(forkedFromSubscription)
    CompositeSubscription.mockReturnValue(compositeSubscription)

    id = String(Math.random())
    referenceDocs = [fakeDoc(), fakeDoc()]
    doc = fakeDoc({data: {references: referenceDocs}})
    onFork = Symbol('onFork')

    props = {id, doc, onFork}

    sut = shallow(<VisViewPageContent {...props} />)
  })

  it('should create profile subscription', () => {
    expect(ProfileSubscription).toHaveBeenCalledWith({id: doc.data.owner})
  })

  it('should create references subscription', () => {
    expect(ReferencesSubscription).toHaveBeenCalledWith({ids: referenceDocs.map(r => r.id)})
  })

  it('should create forked from subscription', () => {
    expect(ForkedFromSubscription).toHaveBeenCalledWith({id: doc.data.forkedFrom}, {projection: true})
  })

  it('should create composite subscription of profile and references', () => {
    expect(CompositeSubscription).toHaveBeenCalledWith({
      profile: profileSubscription,
      referenceDocs: referencesSubscription,
      forkedFrom: forkedFromSubscription
    })
  })

  it('should render base view page content', () => {
    expect(sut.find(BaseViewPageContent).props()).toMatchObject({
      id,
      doc,
      onFork,
      subscription: compositeSubscription,
      Layout: VisViewPageLayout
    })
  })

})
