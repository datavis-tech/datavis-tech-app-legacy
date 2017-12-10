import React from 'react'
import {mount} from 'enzyme'

import fakeSubscription from '../utils/fakeSubscription'
import Subscription from '../../src/components/subscription'

describe('subscription', () => {

  let sut
  let props
  let subscription
  let children
  let onUpdate
  let onPermissionDenied

  beforeAll(() => {
    process.browser = true
  })

  afterAll(() => {
    process.browser = undefined
  })

  beforeEach(() => {

    subscription = fakeSubscription()
    onPermissionDenied = jest.fn()
    onUpdate = jest.fn()

    props = {
      subscription,
      onUpdate,
      onPermissionDenied
    }

    children = jest.fn(() => null)

    sut = mount(<Subscription {...props}>{children}</Subscription>)

  })

  describe('after mount', () => {

    let subscriptionCallbacks

    beforeEach(() => {
      subscriptionCallbacks = subscription.init.mock.calls[0][0]
    })

    it('should render children with empty state', () => {
      expect(children).toHaveBeenCalledWith({data: null, isReady: false})
    })

    describe('when some changes are arrived', () => {

      let update

      beforeEach(() => {
        update = Symbol('update')
        subscriptionCallbacks.onUpdate(update)
      })

      it('should render children with received docs', () => {
        expect(children).toHaveBeenCalledWith({data: update, isReady: true})
      })

      it('should notify on update listener', () => {
        expect(onUpdate).toHaveBeenCalledWith({data: update})
      })

    })

    describe('on permission denied', () => {

      beforeEach(() => {
        subscriptionCallbacks.onPermissionDenied()
      })

      it('should notify', () => {
        expect(onPermissionDenied).toHaveBeenCalled()
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
