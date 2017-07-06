// This component is the thing that runs the code in an iframe.

import React from 'react'
import magicSandbox from 'magic-sandbox'
import { subscribeToDocument } from '../modules/shareDBGateway'

class Runner extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      template: props.doc.data.content,
      files: {},
      allReferencesResolved: false
    }
  }

  componentDidMount () {
    const references = this.props.doc.data.references || []
    
    if (process.browser) {
      references.forEach(({ fileName, id}) => {
        subscribeToDocument(id, (err, referenceDoc) => {
          if (err) {
            console.error(err)
          }

          const newFile = {}
          newFile[fileName] = {
            content: referenceDoc.data.content
          }
          this.setState((state) => {
            const newFiles = Object.assign(state.files, newFile)
            return {
              files: newFiles,
              allReferencesResolved: Object.keys(newFile).length === references.length
            }
          })

          //const updateState = () => {
          //  this.setState({
          //    docInitialized: true,
          //    title: doc.data.title,
          //    description: doc.data.description
          //  })
          //}
          //doc.on('op', updateState)
          //this.cleanupDoc = () => {
          //  doc.destroy()
          //  doc.removeListener('op', updateState)
          //}
        })
      })
    }

    //setTimeout(() => {
    //  this.setState({
    //    allReferencesResolved: true,
    //    files: {
    //      'logData.js': {
    //        content: 'console.log("Data!!")'
    //      }
    //    }
    //  })
    //}, 1000)
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
