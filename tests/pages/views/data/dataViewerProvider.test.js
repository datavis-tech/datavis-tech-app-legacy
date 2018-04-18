import React from 'react'
import { shallow } from 'enzyme'

import { TECH_DOC_TYPE } from '../../../../src/constants'

import CodeMirror from '../../../../src/components/codeMirror'
import DataViewer from '../../../../src/components/dataViewer'

import DataViewerProvider from '../../../../src/pages/views/data/dataViewerProvider'

describe('data viewer provider', () => {

  let sut
  let props

  it('should provide default dataviewer if document is of non tech type', () => {
    props = {
      document: {
        type: String(Math.random()),
        content: String(Math.random())
      }
    }
    sut = shallow(<DataViewerProvider {...props} />)
    expect(sut.find(DataViewer).props()).toMatchObject({
      content: props.document.content
    })
  })

  it('should provide codemirror if document is of tech type', () => {
    props = {
      document: {
        type: TECH_DOC_TYPE,
        content: String(Math.random())
      }
    }
    sut = shallow(<DataViewerProvider {...props} />)

    expect(sut.find(CodeMirror).props()).toMatchObject({
      value: props.document.content
    })
  })

})
