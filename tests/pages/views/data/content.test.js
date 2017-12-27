import React from 'react'
import { shallow } from 'enzyme'

import fakeDoc from '../../../utils/fakeDoc'

jest.mock('../../../../src/db/subscriptions/profileQuerySubscription')
jest.mock('../../../../src/db/subscriptions/referencedBySubscription')
jest.mock('../../../../src/db/subscriptions/documentSubscription')
jest.mock('../../../../src/db/subscriptions/compositeSubscription')

import ProfileQuerySubscription from '../../../../src/db/subscriptions/profileQuerySubscription'
import ReferencedBySubscription from '../../../../src/db/subscriptions/referencedBySubscription'
import ForkedFromSubscription from '../../../../src/db/subscriptions/documentSubscription'
import CompositeSubscription from '../../../../src/db/subscriptions/compositeSubscription'

import BaseViewPageContent from '../../../../src/pages/views/baseViewPageContent'
import DataViewPageLayout from '../../../../src/pages/views/data/layout'
import DataViewPageContent from '../../../../src/pages/views/data/content'

describe('data page content', () => {

  let sut
  let props
  let id
  let doc
  let onFork

  let profileQuerySubscription
  let referencedBySubscription
  let forkedFromSubscription
  let compositeSubscription

  beforeEach(() => {

    profileQuerySubscription = Symbol('profileQuerySubscription')
    referencedBySubscription = Symbol('referencedBySubscription')
    forkedFromSubscription = Symbol('forkedFromSubscription')
    compositeSubscription = Symbol('compositeSubscription')

    ProfileQuerySubscription.mockReturnValue(profileQuerySubscription)
    ReferencedBySubscription.mockReturnValue(referencedBySubscription)
    ForkedFromSubscription.mockReturnValue(forkedFromSubscription)
    CompositeSubscription.mockReturnValue(compositeSubscription)

    id = String(Math.random())
    doc = fakeDoc()
    onFork = Symbol('onFork')

    props = {id, doc, onFork}

    sut = shallow(<DataViewPageContent {...props} />)
  })

  it('should create profile subscription', () => {
    expect(ProfileQuerySubscription).toHaveBeenCalledWith({id: doc.data.owner})
  })

  it('should create referenced by subscription', () => {
    expect(ReferencedBySubscription).toHaveBeenCalledWith({id: doc.id})
  })

  it('should create forked from subscription', () => {
    expect(ForkedFromSubscription).toHaveBeenCalledWith({id: doc.data.forkedFrom}, {projection: true})
  })

  it('should create composite subscription of profile and references', () => {
    expect(CompositeSubscription).toHaveBeenCalledWith({
      profile: profileQuerySubscription,
      referenceDocs: referencedBySubscription,
      forkedFrom: forkedFromSubscription
    })
  })

  it('should render base view page content', () => {
    expect(sut.find(BaseViewPageContent).props()).toMatchObject({
      id,
      doc,
      onFork,
      subscription: compositeSubscription,
      Layout: DataViewPageLayout
    })
  })

})
