import React from 'react'
import { VIS_DOC_TYPE, TECH_DOC_TYPE, DATA_DOC_TYPE } from '../../constants'
import CodeMirrorBinding from '../../components/codeMirrorBinding'

const MODES = {
  [VIS_DOC_TYPE]: {
    name: 'htmlmixed',
    tags: {
      script: [
        ['type', /^text\/babel$/, 'text/jsx'],
        [null, null, 'text/javascript']
      ]
    }
  },
  [TECH_DOC_TYPE]: 'javascript'
}

export default ({ document: {type}, shareDbDocument, path }) => {
  const props = {
    path,
    doc: shareDbDocument,
    mode: MODES[type]
  }

  if (type === DATA_DOC_TYPE) {
    props.inlet = false
  }

  return <CodeMirrorBinding {...props} />
}
