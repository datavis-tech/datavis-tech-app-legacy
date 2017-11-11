import React from 'react'
import {mount} from 'enzyme'

import fakeUser from '../../utils/fakeUser'
import fakeDoc from '../../utils/fakeDoc'
import fakeSubscription from '../../utils/fakeSubscription'
import CallbackTrigger from '../../utils/callbackTrigger'

jest.mock('../../../src/db/subscriptions/documentSubscription')
import DocumentSubscription from '../../../src/db/subscriptions/documentSubscription'

import Loader from '../../../src/components/loader'
jest.mock('../../../src/pages/vis/visPageContent')
import VisPageContent from '../../../src/pages/vis/visPageContent'

import VisViewPage from '../../../src/pages/vis/index'

describe('vis page', () => {

  let sut
  let props

  let id
  let user
  let doc

  let subscription
  let updateTrigger

  beforeAll(() => {
    process.browser = true
  })

  afterAll(() => {
    delete process.browser
  })

  beforeEach(() => {

    id = String(Math.random())
    user = fakeUser()
    doc = fakeDoc()

    updateTrigger = new CallbackTrigger()
    subscription = fakeSubscription(({onUpdate}) => updateTrigger.set(onUpdate, null, doc))
    DocumentSubscription.mockReturnValue(subscription)

    VisPageContent.mockImplementation(() => null)

    props = {id, user}
    sut = mount(<VisViewPage {...props}/>)
  })

  it('should create document subscription', () => {
    expect(DocumentSubscription).toHaveBeenCalledWith({id})
  })

  describe('when doc is not ready', () => {

    it('should have loader', () => {
      expect(sut.find(Loader).prop('isReady')).toBeFalsy()
    })

    it('should not have any content', () => {
      expect(sut.find(VisPageContent).exists()).toBeFalsy()
    })

  })

  describe('when doc is ready', () => {

    beforeEach(() => {
      updateTrigger.trigger()
      sut.update()
    })

    it('should not have loader', () => {
      expect(sut.find(Loader).prop('ready')).toBeTruthy()
    })

    it('should not have any content', () => {
      expect(sut.find(VisPageContent).props()).toMatchObject({
        id,
        user,
        doc
      })
    })
  })

})