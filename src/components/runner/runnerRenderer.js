import React, { Component } from 'react'
import magicSandbox from 'magic-sandbox'

// Z Indices for layering iframe buffers.
const BACK = 4
const FRONT = 5

const defaultUpdateInterval = 300

// This "dumb" component runs the code for a visualization in an iframe.
export default class RunnerRenderer extends Component {
  constructor (props) {
    super(props)
    const updateInterval = props.updateInterval || defaultUpdateInterval
    this.contentChanged = true
    this.swapped = true

    this.interval = setInterval(() => {
      if (this.iFrameRefA && this.iFrameRefB) {
        if (this.needsBufferSwap) {
          this.swapBuffers()
          this.needsBufferSwap = false
        }
        if (this.contentChanged) {
          this.updateBackBuffer()
          this.needsBufferSwap = true
          this.contentChanged = false
        }
      }
    }, updateInterval)
  }

  swapBuffers () {
    this.swapped = !this.swapped
    this.backBuffer().style.zIndex = BACK
    this.frontBuffer().style.zIndex = FRONT
  }

  updateBackBuffer () {
    const {template, files} = this.props
    const srcDoc = magicSandbox(template, files)
    this.backBuffer().setAttribute('srcDoc', srcDoc)
  }

  backBuffer () {
    return this.swapped ? this.iFrameRefA : this.iFrameRefB
  }

  frontBuffer () {
    return this.swapped ? this.iFrameRefB : this.iFrameRefA
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  shouldComponentUpdate (nextProps) {
    this.contentChanged = true
    return false
  }

  render () {
    const width = '100%'
    const height = '500'
    const style = { position: 'absolute', top: '0px', left: '0px' }

    return (
      <div style={{position: 'relative', height: height + 'px'}} >
        <iframe
          ref={el => { this.iFrameRefA = el }}
          style={style}
          width={width}
          height={height}
          scrolling='no'
        />
        <iframe
          ref={el => { this.iFrameRefB = el }}
          style={style}
          width={width}
          height={height}
          scrolling='no'
        />
      </div>
    )
  }
}
