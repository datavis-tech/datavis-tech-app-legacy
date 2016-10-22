import React, { Component } from 'react'
import withShare from '../share/withShare'
import { withRouter } from 'react-router'

// TODO see about abstracting elements common to Document and Vis
class Vis extends Component {

  constructor() {
    super()
    this.state = {
      documentMounted: false
    }
  }

  componentWillMount() {

    const { params: {id}, mountDocument } = this.props

    mountDocument(id).then((doc) => {

      // Increment the view count.
      doc.submitOp({p:['views'], na: 1})

      // Stash the doc reference for later use.
      this.doc = doc

      // Initialize the state.
      this.updateStateFromDoc()

      // Update the state on any doc change.
      doc.on('op', (op, isLocal) => {
        this.updateStateFromDoc()
      })

      // Trigger first rendering with document.
      this.setState({ documentMounted: true })
    })
  }

  updateStateFromDoc() {
    const { title, content } = this.doc.data
    this.setState({
      title,
      content
    })

    const idMatches = content.match(/{{........-....-4...-....-............}}/g)

    const { mountDocument } = this.props

    idMatches.forEach((idMatch) => {
      const id = idMatch.replace(/{|}/g, '')
      mountDocument(id).then((doc) => {

        // TODO make this more reliable, refactor into
        // state.rawContent
        // state.contentReferences = [ { idMatch -> referencedContent} ]
        // state.content = f(rawContent, contentReferences)
        this.setState({
          content: content.replace(idMatch, doc.data.content)
        })
      })
    })
  }

  render() {
    return (
      <div className="container">
        <h1>{this.state.title}</h1>
        <iframe
          style={{
            height: "500px",
            width: "100%",
            border: "solid 1px #ddd"
          }}
          srcDoc={this.state.content}
        />
      </div>
    )
  }
}

export default withShare(withRouter(Vis))
