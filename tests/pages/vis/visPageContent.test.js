import React from 'react'
import {mount} from 'enzyme'

jest.mock('../../../src/pages/vis/visPageLayout')
jest.mock('../../../src/db/subscriptions/profileSubscription')
jest.mock('../../../src/db/subscriptions/documentSubscriptions')
jest.mock('../../../src/db/subscriptions/compositeSubscription')

import ProfileSubscription from '../../../src/db/subscriptions/profileSubscription'
import ReferencesSubscription from '../../../src/db/subscriptions/documentSubscriptions'
import CompositeSubscription from '../../../src/db/subscriptions/compositeSubscription'

import fakeDoc from '../../utils/fakeDoc'
import fakeUser from '../../utils/fakeUser'
import fakeSubscription from '../../utils/fakeSubscription'

import VisPageLayout from '../../../src/pages/vis/visPageLayout'

import VisPageContent from '../../../src/pages/vis/visPageContent'

describe('vis page content', () => {

  let sut
  let props
  let id
  let user
  let doc

  let referencesSubscription
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

    referencesSubscription = Symbol('rs')
    ReferencesSubscription.mockReturnValue(referencesSubscription)

    compositeSubscription = fakeSubscription(({onUpdate}) => onUpdate({profile, referenceDocs}))
    CompositeSubscription.mockReturnValue(compositeSubscription)

    VisPageLayout.mockImplementation(() => null)

    id = String(Math.random())
    user = fakeUser()
    doc = fakeDoc({data: {references: referenceDocs}})

    props = {id, user, doc}

    sut = mount(<VisPageContent {...props} />)
  })

  it('should create profile subscription', () => {
    expect(ProfileSubscription).toHaveBeenCalledWith({id: doc.data.owner})
  })

  it('should create references subscription', () => {
    expect(ReferencesSubscription).toHaveBeenCalledWith({ids: referenceDocs.map(r => r.id)})
  })

  it('should create composite subscription of profile and references', () => {
    expect(CompositeSubscription).toHaveBeenCalledWith({
      profile: profileSubscription,
      referenceDocs: referencesSubscription
    })
  })

  it('should render view page layout', () => {
    expect(sut.find(VisPageLayout).props()).toMatchObject({id, user, doc, profile: profile.data, referenceDocs})
  })

  describe('when references are not populated', () => {

    beforeEach(() => {
      compositeSubscription.init.mockImplementation(({onUpdate}) => onUpdate({profile, referenceDocs: undefined}))
      sut = mount(<VisPageContent {...props} />)
    })

    it('should provide empty list', () => {
      expect(sut.find(VisPageLayout).prop('referenceDocs')).toEqual([])
    })

  })

})
