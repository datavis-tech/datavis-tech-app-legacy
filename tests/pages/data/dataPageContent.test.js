import React from 'react'
import {mount} from 'enzyme'

jest.mock('../../../src/pages/data/dataPageLayout')
jest.mock('../../../src/db/subscriptions/profileSubscription')
jest.mock('../../../src/db/subscriptions/referencedBySubscription')
jest.mock('../../../src/db/subscriptions/compositeSubscription')

import ProfileSubscription from '../../../src/db/subscriptions/profileSubscription'
import ReferencedBySubscription from '../../../src/db/subscriptions/referencedBySubscription'
import CompositeSubscription from '../../../src/db/subscriptions/compositeSubscription'

import fakeDoc from '../../utils/fakeDoc'
import fakeUser from '../../utils/fakeUser'
import fakeSubscription from '../../utils/fakeSubscription'

import DataPageLayout from '../../../src/pages/data/dataPageLayout'

import DataPageContent from '../../../src/pages/data/dataPageContent'

describe('data page content', () => {

  let sut
  let props
  let id
  let user
  let doc

  let referencedBySubscription
  let profileSubscription
  let compositeSubscription

  let profile
  let referenceDocs

  beforeAll(() => {
    process.browser = true
  })

  afterAll(() => {
    delete process.browser
  })

  beforeEach(() => {

    profile = fakeUser()
    referenceDocs = [fakeDoc(), fakeDoc()]

    profileSubscription = Symbol('ps')
    ProfileSubscription.mockReturnValue(profileSubscription)

    referencedBySubscription = Symbol('rs')
    ReferencedBySubscription.mockReturnValue(referencedBySubscription)

    compositeSubscription = fakeSubscription(({onUpdate}) => onUpdate({profile, referenceDocs}))
    CompositeSubscription.mockReturnValue(compositeSubscription)

    DataPageLayout.mockImplementation(() => null)

    id = String(Math.random())
    user = fakeUser()
    doc = fakeDoc({data: {references: referenceDocs}})

    props = {id, user, doc}

    sut = mount(<DataPageContent {...props} />)
  })

  it('should create profile subscription', () => {
    expect(ProfileSubscription).toHaveBeenCalledWith({id: doc.data.owner})
  })

  it('should create referenced by subscription', () => {
    expect(ReferencedBySubscription).toHaveBeenCalledWith({id: doc.id})
  })

  it('should create composite subscription of profile and references', () => {
    expect(CompositeSubscription).toHaveBeenCalledWith({
      profile: profileSubscription,
      referenceDocs: referencedBySubscription
    })
  })

  it('should render view page layout', () => {
    expect(sut.find(DataPageLayout).props()).toMatchObject({id, user, doc, profile: profile.data, referenceDocs})
  })

  describe('when references are not populated', () => {

    beforeEach(() => {
      compositeSubscription.init.mockImplementation(({onUpdate}) => onUpdate({profile, referenceDocs: undefined}))
      sut = mount(<DataPageContent {...props} />)
    })

    it('should provide empty list', () => {
      expect(sut.find(DataPageLayout).prop('referenceDocs')).toEqual([])
    })

  })

})
