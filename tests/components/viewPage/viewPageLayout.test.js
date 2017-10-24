import React from 'react'
import {shallow} from 'enzyme'

import fakeDoc from '../../utils/fakeDoc'
import fakeUser from '../../utils/fakeUser'

import ViewPageLayout from '../../../components/viewPage/viewPageLayout'

describe('view page layout', () => {

  let sut
  let props

  let id
  let user
  let ownerProfile
  let doc
  let Content
  let Description

  beforeEach(() => {
    id = String(Math.random())
    user = fakeUser()
    ownerProfile = {}
    doc = fakeDoc()
    Content = () => <div>{String(Math.random())}</div>
    Description = () => <div>{String(Math.random())}</div>

    props = {
      id,
      user,
      ownerProfile,
      doc,
      Content,
      Description
    }

    sut = shallow(<ViewPageLayout {...props}> <span>TEST</span> </ViewPageLayout>)

  })

  it('should render Content', () => {
    expect(sut.find(Content).props()).toMatchObject({doc})
  })

  it('should render Description', () => {
    expect(sut.find(Description).props()).toMatchObject({doc})
  })

})
