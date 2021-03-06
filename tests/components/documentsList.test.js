import React from 'react'
import { shallow } from 'enzyme'
import DocumentsList from '../../src/components/documentsList'

describe('document list', () => {

  let sut
  let documents

  beforeEach(() => {
    documents = []
    sut = shallow(<DocumentsList documents={documents} />)
  })

  it('should render nothing when there are no documents', () => {
    expect(sut.html()).toEqual(null)
  })

  describe('when documents are present', () => {

    let visDoc
    let dataDoc

    beforeEach(() => {
      visDoc = {type: 'vis'}
      dataDoc = {type: 'data'}
      documents = [visDoc, dataDoc]

      sut.setProps({documents})
    })

    it('should contain datasets', () => {
      expect(sut.findWhere(n => n.prop('title') === 'Datasets').props()).toMatchObject({
        documents: [dataDoc]
      })
    })

    it('should contain visualiztions', () => {
      expect(sut.findWhere(n => n.prop('title') === 'Visualizations').props()).toMatchObject({
        documents: [visDoc]
      })
    })

  })

})
