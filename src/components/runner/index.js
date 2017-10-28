import React from 'react'
import subscribeToDocument from '../../db/subscribeToDocument'
import Loading from '../loading'
import RunnerRenderer from './runnerRenderer'

// This "smart" component subscribes to all documents
// referenced by the visualization document.
class Runner extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      // Props.doc is expected to be a ShareDB document
      // that has already been subscribed to.
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

      // TODO move this fallback logic out of here.
      // Perhaps to an accessor?
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

        // If the document has no references,
        // consider all refererences resolved.
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

    // If not all references have resolved yet,
    // render a spinner to show things are loading.
    if (!this.state.allReferencesResolved) {
      return <Loading />
    }

    // Render the iframe whenever the state changes.
    return (
      <RunnerRenderer
        template={this.state.template}
        files={this.state.files}
      />
    )
  }
}

export default Runner
