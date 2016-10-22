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
    const idMatches = this.state.rawContent.match(idMatchRegex) || []

    const { mountDocument } = this.props
    const { contentReferences } = this.state

    Promise.all(idMatches
      .map((idMatch) => {

        if(!(idMatch in contentReferences)){

          const id = idMatch.replace(/{|}/g, '')

          // TODO unmount this document on component unmount
          return mountDocument(id).then((doc) => {
            const updateContentReference = () => {
              this.setState({
                contentReferences: Object.assign(contentReferences, {
                  [idMatch]: doc.data.content
                })
              })
            }
            updateContentReference()

            const listener = (ops) => {
              if(ops.some((op) => op.p[0] === 'content')){
                updateContentReference()
                this.updateContent()
              }
            }

            // TODO unsubscribe using removeListener(eventName, listener)
            doc.on('op', listener)
          })
        } else {
          return Promise.resolve()
        }
      })
    ).then(() => {
      this.updateContent()
    })
  }

  // Replaces all ids referenced in rawContent with their corresponding document content.
  updateContent() {
    const content = Object.keys(this.state.contentReferences)
      .reduce((content, idMatch) => {
        return content.replace(idMatch, this.state.contentReferences[idMatch])
      }, this.state.rawContent)
    this.setState({ content })
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
