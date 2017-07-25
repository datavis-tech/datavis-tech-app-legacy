// This component is the thing that runs the code in an iframe.

import React from 'react'
import magicSandbox from 'magic-sandbox'
import subscribeToDocument from '../modules/db/subscribeToDocument'
import Loading from './loading'

class Runner extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      template: props.doc.data.content,

      // The referenced "files" to be passed into magicSandbox.
      // Keys are "fileName"s, values are text contents.
      files: {},

      // True after all references resolved, triggers first rendering.
      allReferencesResolved: false
    }

    // An array of functions to be invoked on unmount.
    this.cleanupFunctions = []
  }

  componentDidMount () {
    // Handle references.
    // TODO test the following cases:
    //  * The main content changes.
    //  * A new reference is added.
    //  * A reference is deleted.
    //  * The content of a reference changes.
    //  * The title of a reference changes (should not re-render)
    //  * The description of a reference changes (should not re-render)

    if (process.browser) {

      const doc = this.props.doc
      const references = doc.data.references || []
      // Subscribe to referenced documents, and update state when they change.
      if (references.length !== 0) {
        references.forEach(({ fileName, id }) => {
          subscribeToDocument(id, (err, referenceDoc) => {
            if (err) {
              console.error(err)
            }

            const updateState = () => {
              const newFile = {
                [fileName]: {
                  content: referenceDoc.data.content
                }
              }
              this.setState((state) => {
                const newFiles = Object.assign(state.files, newFile)
                return {
                  files: newFiles,
                  allReferencesResolved: Object.keys(newFiles).length === references.length
                }
              })
            }
            updateState()

            // TODO only execute this if the content changes (ignore title and description changes)
            referenceDoc.on('op', updateState)

            this.cleanupFunctions.push(() => {
              referenceDoc.destroy()
              referenceDoc.removeListener('op', updateState)
            })
          })
        })
      } else {
        this.setState({
          allReferencesResolved: true
        })
      }

      // Respond to changes in the main document content.
      // TODO only execute this if the content changes (ignore title and description changes)
      const updateTemplate = () => {
        this.setState({
          template: doc.data.content
        })
      }
      doc.on('op', updateTemplate)
      this.cleanupFunctions.push(() => {
        doc.removeListener('op', updateTemplate)
      })
    }
  }

  // Invoke each cleanup function on unmount.
  componentWillUnmount () {
    this.cleanupFunctions.forEach(f => f())
  }

  render () {
    if (!this.state.allReferencesResolved) {
      return <Loading />
    }

    const { template, files } = this.state
    const source = magicSandbox(template, files)

    return (
      <iframe
        width='960'
        height='500'
        scrolling='no'
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
