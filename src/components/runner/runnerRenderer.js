import React, { Component } from 'react'
import magicSandbox from 'magic-sandbox'

// Z Indices for layering iframe buffers.
const BACK = 4;
const FRONT = 5;

// This "dumb" component runs the code for a visualization in an iframe.
export default class RunnerRenderer extends Component {
  constructor (props) {
    super(props)
    const updateInterval = props.updateInterval || 300

    this.contentChanged = true

    this.state = {
      bufferA: {
        zIndex: BACK,
        srcDoc: ''
      },
      bufferB: {
        zIndex: FRONT,
        srcDoc: ''
      }
    };

    this.interval = setInterval(() => {
      if (this.needsBufferSwap) {
        this.swapBuffers()
        this.needsBufferSwap = false
      }
      if (this.contentChanged) {
        this.updateBackBuffer()
        this.needsBufferSwap = true
      }
    }, updateInterval)
  }

  swapBuffers(){
  }

  updateBackBuffer () {
    const {template, files} = this.props
    const backBufferName = this.state.buffers.bufferA.zIndex === BACK ? 'bufferA' : 'bufferB';
    this.setState(Object.assign({}, this.state, {
      [backBufferName]: {
        zIndex: this.state.buffers[backBufferName].zIndex,
        srcDoc: magicSandbox(template, files)
      }
    }))
  }

  componentWillReceiveProps (props) {
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  render(){
    return Object.values(this.state.buffers).map(({zIndex, srcDoc}) => (
      <iframe
        style={{zIndex}}
        width='100%'
        height='500'
        scrolling='no'
        srcDoc={srcDoc}
      />
    ))
  }
}
