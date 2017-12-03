import React from 'react'
import {shallow} from 'enzyme'
import {random, range} from 'lodash'
import {Divider} from 'semantic-ui-react'
import fakeDoc from '../../../utils/fakeDoc'
import DocumentPreview from '../../../../src/pages/views/slots/documentPreview'
import DocumentPreviewList from '../../../../src/pages/views/slots/documentPreviewList'

describe('document preview list', () => {

  let sut
  let documents
  let title

  beforeEach(() => {
    title = String(Math.random())
    documents = []
    sut = shallow(<DocumentPreviewList title={title} documents={documents} />)
  })

  it('should render nothing when there are no documents', () => {
    expect(sut.html()).toEqual(null)
  })

  describe('when there are some docs', () => {

    beforeEach(() => {
      documents = createRandomDocumentArray()
      sut.setProps({documents})
    })

    it('should have title', () => {
      expect(sut.find(Divider).prop('children')).toEqual(title)
    })

    it('should create N document previews', () => {
      expect(sut.find(DocumentPreview).length).toEqual(documents.length)
    })

    it('should render N document previews with proper document', () => {
      sut.find(DocumentPreview).forEach((doc, i) => {
        expect(doc.props()).toMatchObject({ doc: documents[i] })
      })
    })

  })

})

function createRandomDocumentArray () {
  return range(random(2, 10)).map(_ => fakeDoc())
}
