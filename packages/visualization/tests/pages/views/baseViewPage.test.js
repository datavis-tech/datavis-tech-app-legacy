import React from 'react'
import {mount} from 'enzyme'

import fakeUser from '../../utils/fakeUser'
import fakeDoc from '../../utils/fakeDoc'
import fakeSubscription from '../../utils/fakeSubscription'
import CallbackTrigger from '../../utils/callbackTrigger'

jest.mock('../../../src/db/subscriptions/documentSubscription')
import DocumentSubscription from '../../../src/db/subscriptions/documentSubscription'

jest.mock('../../../src/components/layout')
import Layout from '../../../src/components/layout'

jest.mock('../../../src/components/router/redirectTo404')
import redirectTo404 from '../../../src/components/router/redirectTo404'

import Loader from '../../../src/components/loader'
import ErrorMessage from '../../../src/components/errorMessage'

import BaseViewPage from '../../../src/pages/views/baseViewPage'

describe('base view page', () => {

  let sut
  let props
  let Children
  let layoutProps

  let id
  let user
  let doc
  let error

  let subscription
  let updateTrigger
  let errorTrigger
  let permissionDeniedTrigger

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
    permissionDeniedTrigger = new CallbackTrigger()

    error = Symbol('error')

    subscription = fakeSubscription(
      ({onUpdate, onError, onPermissionDenied}) => {
        updateTrigger.set(onUpdate, null, doc)
        errorTrigger.set(onError, null, error)
        permissionDeniedTrigger.set(onPermissionDenied, null)
      }
    )
    DocumentSubscription.mockReturnValue(subscription)

    Layout.mockImplementation(({children}) => children)
    Children = jest.fn(() => null)

    layoutProps = Symbol('layoutProps')
    props = {id, user, layoutProps}
    sut = mount(<BaseViewPage {...props}>{Children}</BaseViewPage>)
  })

  it('should have layout and default title', () => {
    expect(sut.find(Layout).props()).toMatchObject({
      title: 'Loading... | Datavis.tech',
      layoutProps
    })
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
      expect(Children.mock.calls[2][0].doc).toEqual(doc)
      expect(typeof Children.mock.calls[2][0].onError).toEqual('function')
    })

    it('should have title based on document title', () => {
      expect(sut.find(Layout).prop('title')).toEqual(`${doc.data.title} | Datavis.tech`)
    })
  })

  describe('when error occurred from subscription', () => {

    beforeEach(() => {
      errorTrigger.trigger()
      sut.update()
    })

    it('should show error', () => {
      expect(sut.find(ErrorMessage).prop('error')).toBe(error)
    })

  })

  describe('when error occurred from within children', () => {

    beforeEach(() => {
      sut.update()
      Children.mock.calls[0][0].onError('foo')
      sut.update()
    })

    it('should show error', () => {
      expect(sut.find(ErrorMessage).prop('error')).toBe('foo')
    })

  })

  describe('when permission denied', () => {

    beforeEach(() => {
      permissionDeniedTrigger.trigger()
    })

    it('should redirect to 404', () => {
      expect(redirectTo404).toHaveBeenCalled()
    })

  })

})
