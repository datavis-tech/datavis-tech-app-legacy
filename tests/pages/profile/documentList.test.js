import React from 'react'
import {shallow} from 'enzyme'
import fakeDoc from '../../utils/fakeDoc'
import Loader from '../../../src/components/loader'
import DocumentsList from '../../../src/pages/profile/documentsList'

describe('document list', () => {

  let sut
  let documents
  let documentsLoading

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
      documentsLoading = true
      visDoc = fakeDoc({data: {type: 'vis'}})
      dataDoc = fakeDoc({data: {type: 'data'}})
      documents = [visDoc, dataDoc]

      sut.setProps({documents, documentsLoading})
    })

    it('should contain loader', () => {
      expect(sut.find(Loader).prop('ready')).toEqual(!documentsLoading)
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
