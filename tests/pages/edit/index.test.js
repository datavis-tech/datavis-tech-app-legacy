import * as React from 'react'
import {shallow} from 'enzyme'

jest.mock('../../../modules/db/subscribeToDocument')

import subscribeToDocument from '../../../modules/db/subscribeToDocument'
import References from '../../../pages/edit/references'
import Edit from '../../../pages/edit'

describe('edit page', () => {

  let sut
  let id
  let props

  // TODO create test utils
  let doc = {
    on: jest.fn(),
    destroy: jest.fn(),
    removeListener: jest.fn()
  }

  beforeAll(() => {
    process.browser = true
  })

  afterAll(() => {
    delete process.browser
  })

  beforeEach(() => {
    id = String(Math.random())
    props = {id}
    subscribeToDocument.mockImplementation((id, callback) => {
      callback(null, doc)
    })

  })

  it('should show references if doc type is undefined', () => {
    doc.data = {}
    sut = shallow(<Edit {...props} />).dive()
    expect(sut.find(References).props()).toMatchObject({doc})
  })

  it('should show references if doc type is visualization', () => {
    doc.data = {type: 'vis'}
    sut = shallow(<Edit {...props} />).dive()
    expect(sut.find(References).props()).toMatchObject({doc})
  })

  it('should not show references if doc type is dataset', () => {
    doc.data = {type: 'data'}
    sut = shallow(<Edit {...props} />).dive()
    expect(sut.find(References).exists()).toBeFalsy()
  })

})
