import React from 'react'
import {mount} from 'enzyme'

// Mock ViewPageLayout so we can test its props.
jest.mock('../../src/components/viewPage/viewPageLayout', () => jest.fn(() => null))
jest.mock('../../src/db/subscriptions/visSubscription')

import VisSubscription from '../../src/db/subscriptions/visSubscription'

import Loader from '../../src/components/loader'
import DataViewer from '../../src/components/dataViewer'
import ViewPageLayout from '../../src/components/viewPage/viewPageLayout'

import fakeUser from '../utils/fakeUser'
import fakeSubscription from '../utils/fakeSubscription'
import CallbackTrigger from '../utils/callbackTrigger'
import Data from '../../src/pages/data'

describe('data page', () => {

  let sut
  let id
  let user
  let subscription
  let updateTrigger
  let doc
  let profile
  let referenceDocs

  beforeAll(() => {
    process.browser = true
  })

  afterAll(() => {
    delete process.browser
  })

  beforeEach(() => {
    id = Symbol('id')
    user = Symbol('user')
    doc = Symbol('doc')
    profile = fakeUser()
    referenceDocs = Symbol('referenceDocs')

    updateTrigger = new CallbackTrigger()
    subscription = fakeSubscription(({onUpdate}) => updateTrigger.set(onUpdate, null, {doc, profile, referenceDocs}))
    VisSubscription.mockReturnValue(subscription)
    sut = mount(<Data id={id} user={user} />)
  })

  it('should show loader when subscription is not ready', () => {
    expect(sut.find(Loader).props()).toMatchObject({ready: false})
  })

  describe('when ready', () => {

    beforeEach(() => {
      updateTrigger.trigger()
      sut.update()
    })

    it('should not have loader', () => {
      expect(sut.find(Loader).props()).toMatchObject({ready: true})
    })

    it('should render view page layout with doc, profile, references and runner as content', () => {
      expect(sut.find(ViewPageLayout).props()).toMatchObject({
        id,
        user: user,
        ownerProfile: profile.data,
        doc: doc,
        referenceDocs: referenceDocs,
        Content: DataViewer
      })
    })

  })

})
