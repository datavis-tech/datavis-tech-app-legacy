import React from 'react'
import {shallow} from 'enzyme'
import {random, range} from 'lodash'

import DocumentPreview from '../../../components/documentPreview'
import DocumentsList from '../../../pages/profile/documentsList'

describe('document list', () => {

  let sut
  let documents

  describe('data documents', () => {
    testDocumentPreviews('data')
  })

  describe('vis documents', () => {
    testDocumentPreviews('vis')
  })

  function testDocumentPreviews (type) {
    beforeEach(() => {
      documents = createRandomDocumentArray(type)
      sut = shallow(<DocumentsList documents={documents} />)
    })

    it('should create N document previews', () => {
      expect(sut.find(DocumentPreview).length).toEqual(documents.length)
    })

    it('should render N document previews with proper document', () => {
      sut.find(DocumentPreview).forEach((doc, i) => {
        expect(doc.props()).toMatchObject({
          ...documents[i]
        })
      })
    })
  }

})

function createRandomDocumentArray (type) {
  return range(random(2, 10)).map(_ => ({data: {type, description: String(Math.random())}}))
}
