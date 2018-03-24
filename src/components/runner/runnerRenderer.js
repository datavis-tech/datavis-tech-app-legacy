import React, { Component } from 'react'
import magicSandbox from 'magic-sandbox'

// This "dumb" component runs the code for a visualization in an iframe.
export default class RunnerRenderer extends Component {
  constructor (props) {
    super(props)
    const updateInterval = props.updateInterval || 300

    this.state = {
    };

    this.interval = setInterval(() => {
      if (this.needsBufferSwap) {
        swapBuffers()
        this.needsBufferSwap = false
      }
      if (this.contentChanged) {
        renderBackBuffer()
        this.needsBufferSwap = true
      }
    }, updateInterval)
  }

  componentWillReceiveProps (props) {

  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  render(){
    const {template, files} = this.props
    return (
      <iframe
        width='100%'
        height='500'
        scrolling='no'
        srcDoc={magicSandbox(template, files)}
      />
    )
  }
}
