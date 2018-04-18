import React from 'react'

// TODO test
export default class CodeMirror extends React.Component {
  componentDidMount () {

    const { value, mode = 'javascript', readOnly = true, height = 500 } = this.props

    // Static import breaks the server, see https://github.com/codemirror/CodeMirror/issues/3701
    const CodeMirror = require('codemirror')
    require('codemirror/mode/javascript/javascript')

    const codeMirror = CodeMirror(this.el, {
      value,
      mode,
      readOnly,
      indentWithTabs: false,
      indentUnit: 2,
      lineNumbers: true
    })
    codeMirror.setSize(null, height)

  }

  render () {
    return <div ref={el => { this.el = el }} />
  }
}
