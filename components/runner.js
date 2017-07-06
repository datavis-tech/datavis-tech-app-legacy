// This component is the thing that runs the code in an iframe.

import React from 'react'
import magicSandbox from 'magic-sandbox'

class Runner extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      template: props.doc.data.content,
      allReferencesResolved: false
    }
  }

  componentDidMount () {
    console.log('here')
    setTimeout(() => {
      this.setState({
        allReferencesResolved: true,
        files: {
          'logData.js': {
            content: 'console.log("Data!!")'
          }
        }
      })
    }, 1000)
  }

  render () {
    if (!this.state.allReferencesResolved) {
      return <div>Loading...</div>
    }

    const content = this.props.doc.data.content

    const { template, files } = this.state
    const source = magicSandbox(template, files)

    return (
      <iframe
        width='960'
        height='500'
        style={{
          border: 'solid 1px #ddd'
          // transform: 'scale(1)'
        }}
        srcDoc={source}
      />
    )
  }
}

export default Runner
