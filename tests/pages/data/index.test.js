import React from 'react'
import {shallow} from 'enzyme'

jest.mock('../../../src/components/page', () => args => args)
jest.mock('../../../src/components/viewPage/viewPageComponentFactory', () => DataViewPage => DataViewPage)

jest.mock('../../../src/db/actions/fork')
import { fork } from '../../../src/db/actions/fork'

jest.mock('../../../src/routes')
import {Router} from '../../../src/routes'

import fakeUser from '../../utils/fakeUser'
import fakeDoc from '../../utils/fakeDoc'

import DataPageContent from '../../../src/pages/data/dataPageContent'
import DataViewPage from '../../../src/pages/data/index'

describe('data page', () => {

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

    sut = shallow(<DataViewPage {...props} />)

  })

  it('should render data page content', () => {
    expect(sut.find(DataPageContent).props()).toMatchObject({
      id, user, doc
    })
  })

  describe('fork', () => {

    let forked

    beforeEach(() => {
      forked = fakeDoc()
      fork.mockReturnValue(forked)
      sut.find(DataPageContent).prop('onFork')(doc)
    })

    it('should change route to forked document view page', () => {
      expect(Router.pushRoute).toHaveBeenCalledWith('edit', {id: forked.id})
    })

  })

})
