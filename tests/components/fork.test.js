import React from 'react'
import { shallow } from 'enzyme'

jest.mock('../../src/routes')
import { Router } from '../../src/routes'

jest.mock('../../src/db/actions')
import { fork } from '../../src/db/actions'

import fakeUser from '../utils/fakeUser'
import fakeDoc from '../utils/fakeDoc'
import Fork from '../../src/components/fork'

describe('fork', () => {

  let props
  let doc
  let user
  let children
  let forkedDocument
  let done

  beforeEach(() => {

    done = jest.fn()
    forkedDocument = fakeDoc()
    fork.mockReturnValue(forkedDocument)

    user = fakeUser()
    doc = fakeDoc()
    props = {
      user,
      doc
    }

    children = jest.fn()

    shallow(<Fork {...props}>{children}</Fork>)
  })

  it('should render children', () => {
    expect(children).toHaveBeenCalled()
  })

  describe('on fork', () => {
    beforeEach(() => {
      children.mock.calls[0][0].onFork(done)
    })

    it('should fork doc', () => {
      expect(fork).toHaveBeenCalledWith(doc, user.id)
    })

    it('should redirect to edit page', () => {
      expect(Router.pushRoute).toHaveBeenCalledWith('edit', {id: forkedDocument.id})
    })

    it('should call done', () => {
      expect(done).toHaveBeenCalledWith()
    })

  })

  describe('trying to fork without user', () => {

    let onError

    beforeEach(() => {

      onError = jest.fn()

      props = {
        onError
      }
      shallow(<Fork {...props}>{children}</Fork>)
      children.mock.calls[1][0].onFork(done)
    })

    it('should notify about error', () => {
      expect(onError).toHaveBeenCalledWith('You must be logged in to fork.')
    })

    it('should call done with error', () => {
      expect(done).toHaveBeenCalledWith('You must be logged in to fork.')
    })
  })

})
