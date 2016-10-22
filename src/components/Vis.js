import React, { Component } from 'react'
import withShare from '../share/withShare'
import { withRouter } from 'react-router'

// TODO see about abstracting elements common to Document and Vis
class Vis extends Component {

  constructor() {
    super()
    this.state = {
      documentMounted: false,
      contentReferences: {}
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
      doc.on('op', () => { this.updateStateFromDoc() })

      // Trigger first rendering with document.
      this.setState({ documentMounted: true })
    })
  }

  updateStateFromDoc() {
    const {
      title,
      content:rawContent
    } = this.doc.data

    if(title !== this.state.title){
      this.setState({ title })
    }
    
    if(rawContent !== this.state.rawContent){
      this.setState({ rawContent })
      this.updateReferences()
    }
  }

  updateReferences() {

    const idMatchRegex = /{{........-....-4...-....-............}}/g
    const idMatches = this.state.rawContent.match(idMatchRegex)

    const { mountDocument } = this.props

    Promise.all(idMatches
      .map((idMatch) => {
        const id = idMatch.replace(/{|}/g, '')

        // TODO unmount this document on component unmount
        return mountDocument(id).then((doc) => {
          const updateContentReference = () => {
            this.setState({
              contentReferences: Object.assign(this.state.contentReferences, {
                [idMatch]: doc.data.content
              })
            })
          }
          updateContentReference()
          doc.on('op', (ops) => {
            if(ops.some((op) => op.p[0] === 'content')){
              updateContentReference()
              this.updateContent()
            }
          })
        })
      })
    ).then(() => {
      this.updateContent()
    })
  }

  updateContent() {
    const { contentReferences, rawContent } = this.state
    this.setState({
      content: Object.keys(contentReferences)
        .reduce((content, idMatch) => {
          return content.replace(idMatch, contentReferences[idMatch])
        }, rawContent)
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
