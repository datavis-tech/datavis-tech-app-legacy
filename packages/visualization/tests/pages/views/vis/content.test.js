import React from 'react'
import { shallow } from 'enzyme'

import fakeDoc from '../../../utils/fakeDoc'

jest.mock('../../../../src/db/subscriptions/profileQuerySubscription')
jest.mock('../../../../src/db/subscriptions/documentSubscriptions')
jest.mock('../../../../src/db/subscriptions/documentSubscription')
jest.mock('../../../../src/db/subscriptions/compositeSubscription')

import ProfileQuerySubscription from '../../../../src/db/subscriptions/profileQuerySubscription'
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

  let profileQuerySubscription
  let referencesSubscription
  let forkedFromSubscription
  let compositeSubscription

  beforeEach(() => {

    profileQuerySubscription = Symbol('profileQuerySubscription')
    referencesSubscription = Symbol('referencesSubscription')
    forkedFromSubscription = Symbol('forkedFromSubscription')
    compositeSubscription = Symbol('compositeSubscription')

    ProfileQuerySubscription.mockReturnValue(profileQuerySubscription)
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
    expect(ProfileQuerySubscription).toHaveBeenCalledWith({id: doc.data.owner})
  })

  it('should create references subscription', () => {
    expect(ReferencesSubscription).toHaveBeenCalledWith({ids: referenceDocs.map(r => r.id)})
  })

  it('should create forked from subscription', () => {
    expect(ForkedFromSubscription).toHaveBeenCalledWith({id: doc.data.forkedFrom}, {projection: true})
  })

  it('should create composite subscription of profile and references', () => {
    expect(CompositeSubscription).toHaveBeenCalledWith({
      profile: profileQuerySubscription,
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
