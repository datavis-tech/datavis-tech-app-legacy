import React from 'react'
import {shallow} from 'enzyme'

import fakeDoc from '../../utils/fakeDoc'
import fakeUser from '../../utils/fakeUser'

import ViewPageLayout from '../../../src/components/viewPage/viewPageLayout'

describe('view page layout', () => {

  let sut
  let props

  let id
  let user
  let ownerProfile
  let doc
  let referenceDocs
  let Content
  let Description
  let References
  let onFork

  beforeEach(() => {
    id = String(Math.random())
    user = fakeUser()
    ownerProfile = {}
    doc = fakeDoc()
    referenceDocs = Symbol('referenceDocs')
    Content = () => <div>{String(Math.random())}</div>
    Description = () => <div>{String(Math.random())}</div>
    References = () => <div>{String(Math.random())}</div>
    onFork = jest.fn()

    props = {
      id,
      user,
      ownerProfile,
      doc,
      referenceDocs,
      Content,
      Description,
      References,
      onFork
    }

    sut = shallow(<ViewPageLayout {...props}> <span>TEST</span> </ViewPageLayout>)

  })

  it('should render Content', () => {
    expect(sut.find(Content).props()).toMatchObject({doc, referenceDocs})
  })

  it('should render Description', () => {
    expect(sut.find(Description).props()).toMatchObject({doc})
  })

  it('should render References', () => {
    expect(sut.find(References).props()).toMatchObject({referenceDocs})
  })

})
