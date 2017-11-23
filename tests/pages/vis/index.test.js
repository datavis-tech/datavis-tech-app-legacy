import React from 'react'
import {shallow} from 'enzyme'

jest.mock('../../../src/components/page', () => args => args)
jest.mock('../../../src/components/viewPage/viewPageComponentFactory', () => VisViewPage => VisViewPage)

jest.mock('../../../src/db/actions/fork')
import { fork } from '../../../src/db/actions/fork'

jest.mock('../../../src/routes')
import {Router} from '../../../src/routes'

import fakeUser from '../../utils/fakeUser'
import fakeDoc from '../../utils/fakeDoc'

import VisPageContent from '../../../src/pages/vis/visPageContent'
import VisViewPage from '../../../src/pages/vis/index'

describe('vis page', () => {

  let sut
  let id
  let user
  let doc
  let props

  beforeEach(() => {

    id = String(Math.random())
    user = fakeUser()
    doc = fakeDoc()

    props = {
      id,
      user,
      doc
    }

    sut = shallow(<VisViewPage {...props} />)

  })

  it('should render vis page content', () => {
    expect(sut.find(VisPageContent).props()).toMatchObject({
      id, user, doc
    })
  })

  describe('fork', () => {

    let forked

    beforeEach(() => {
      forked = fakeDoc()
      fork.mockReturnValue(forked)
      sut.find(VisPageContent).prop('onFork')(doc)
    })

    it('should change route to forked document view page', () => {
      expect(Router.pushRoute).toHaveBeenCalledWith('edit', {id: forked.id})
    })

  })

})
