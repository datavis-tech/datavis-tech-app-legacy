import React from 'react'
import {mount} from 'enzyme'

import fakeUser from '../../utils/fakeUser'
import fakeDoc from '../../utils/fakeDoc'
import fakeSubscription from '../../utils/fakeSubscription'
import CallbackTrigger from '../../utils/callbackTrigger'

jest.mock('../../../src/db/subscriptions/documentSubscription')
import DocumentSubscription from '../../../src/db/subscriptions/documentSubscription'

import Loader from '../../../src/components/loader'
import ErrorMessage from '../../../src/components/errorMessage'

import ViewPage from '../../../src/components/viewPage/viewPage'

describe('view page', () => {

  let sut
  let props
  let Children

  let id
  let user
  let doc
  let error

  let subscription
  let updateTrigger
  let errorTrigger

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
    errorTrigger = new CallbackTrigger()

    error = Symbol('error')

    subscription = fakeSubscription(
      ({onUpdate, onError}) => {
        updateTrigger.set(onUpdate, null, doc)
        errorTrigger.set(onError, null, error)
      }
    )
    DocumentSubscription.mockReturnValue(subscription)

    Children = jest.fn(() => null)

    props = {id, user}
    sut = mount(<ViewPage {...props}>{Children}</ViewPage>)
  })

  it('should create document subscription', () => {
    expect(DocumentSubscription).toHaveBeenCalledWith({id})
  })

  describe('when doc is not ready', () => {

    it('should have loader', () => {
      expect(sut.find(Loader).prop('isReady')).toBeFalsy()
    })

    it('should not have any content', () => {
      expect(sut.find(Children).exists()).toBeFalsy()
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

    it('should have content', () => {
      expect(Children).toHaveBeenCalledWith(doc)
    })
  })

  describe('when error occurred', () => {

    beforeEach(() => {
      errorTrigger.trigger()
      sut.update()
    })

    it('should show error message', () => {
      expect(sut.find(ErrorMessage).props()).toMatchObject({error})
    })

  })
})
