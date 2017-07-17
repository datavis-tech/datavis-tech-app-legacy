// This component is the thing that displays a dataset
import React from 'react'

class DataViewer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      dataContent: props.doc.data.content
    }

    // An array of functions to be invoked on unmount.
    this.cleanupFunctions = []
  }

  componentDidMount () {
    if (process.browser) {
      const doc = this.props.doc
      // TODO only execute this if the content changes (ignore title and description changes)
      const updateDataContent = () => {
        this.setState({
          dataContent: doc.data.content
        })
      }
      doc.on('op', updateDataContent)
      this.cleanupFunctions.push(() => {
        doc.removeListener('op', updateDataContent)
      })
    }
  }

  // Invoke each cleanup function on unmount.
  componentWillUnmount () {
    this.cleanupFunctions.forEach(f => f())
  }

  render () {
    return (
      <div style={{ maxHeight: '500px', overflow: 'auto', border: 'solid 1px #ddd' }} >
        <pre>{this.state.dataContent}</pre>
      </div>
    )
  }
}

export default DataViewer
