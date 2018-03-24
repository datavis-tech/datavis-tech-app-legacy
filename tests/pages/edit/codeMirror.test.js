import React from 'react'
import { shallow } from 'enzyme'

import { VIS_DOC_TYPE, TECH_DOC_TYPE, DATA_DOC_TYPE } from '../../../src/constants'
import CodeMirrorBinding from '../../../src/components/codeMirrorBinding'
import CodeMirror from '../../../src/pages/edit/codeMirror'

describe('code mirror', () => {

  let sut
  let props
  let document
  let shareDbDocument
  let path

  beforeEach(() => {

    document = {}
    shareDbDocument = Symbol('shareDbDocument')
    path = Symbol('path')

    props = {
      document, shareDbDocument, path
    }

    sut = shallow(<CodeMirror {...props} />)
  })

  it('should pass path to code mirror binding', () => {
    expect(sut.find(CodeMirrorBinding).prop('path')).toBe(path)
  })

  it('should pass share db document to code mirror binding', () => {
    expect(sut.find(CodeMirrorBinding).prop('doc')).toBe(shareDbDocument)
  })

  it('should not pass any mode by default', () => {
    expect(sut.find(CodeMirrorBinding).prop('mode')).not.toBeDefined()
  })

  it('should pass html mixed mode if document is of vis type', () => {
    sut.setProps({
      document: { type: VIS_DOC_TYPE }
    })
    expect(sut.find(CodeMirrorBinding).prop('mode')).toMatchObject({
      name: 'htmlmixed',
      tags: {
        script: [
          ['type', /^text\/babel$/, 'text/jsx'],
          [null, null, 'text/javascript']
        ]
      }
    })
  })

  it('should pass javascript mode if document is of tech type', () => {
    sut.setProps({
      document: { type: TECH_DOC_TYPE }
    })
    expect(sut.find(CodeMirrorBinding).prop('mode')).toEqual('javascript')
  })

  it('should disable inlet if document is of data type', () => {
    sut.setProps({
      document: { type: DATA_DOC_TYPE }
    })
    expect(sut.find(CodeMirrorBinding).prop('inlet')).toEqual(false)
  })
})
