import React from 'react'
import {mount} from 'enzyme'

import Subscription from '../../src/components/subscription'

describe('subscription', () => {

  let sut
  let props
  let subscription
  let parameters
  let children

  beforeAll(() => {
    process.browser = true
  })

  afterAll(() => {
    process.browser = undefined
  })

  beforeEach(() => {

    parameters = {
      a: Symbol(),
      b: Symbol()
    }

    subscription = {
      init: jest.fn(),
      tearDown: jest.fn()
    }

    props = {
      subscription,
      parameters
    }

    children = jest.fn(() => null)

    sut = mount(<Subscription {...props}>{children}</Subscription> )

  })

  describe('after mount', () => {

    let subscriptionParameters
    let subscriptionCallbacks

    beforeEach(() => {
      subscriptionParameters = subscription.init.mock.calls[0][0]
      subscriptionCallbacks = subscription.init.mock.calls[0][1]
    })

    it('should init subscription with proper params', () => {
      expect(subscriptionParameters).toEqual(parameters)
    })

    it('should render children with empty docs', () => {
      expect(children).toHaveBeenCalledWith({docs: []})
    })

    describe('when some changes are arrived', () => {

      let docs

      beforeEach(() => {
        docs = [Symbol()]
        subscriptionCallbacks.onUpdate(docs)
      })

      it('should render children with received docs', () => {
        expect(children).toHaveBeenCalledWith({docs})
      })

    })

  })

  describe('on unmount', () => {

    beforeEach(() => {
      sut.unmount()
    })

    it('should tear down subscription', () => {
      expect(subscription.tearDown).toHaveBeenCalled()
    })

  })

})
