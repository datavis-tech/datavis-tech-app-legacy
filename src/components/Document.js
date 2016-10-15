import React, { Component } from 'react'
import { withRouter } from 'react-router'
import withShare from '../share/withShare'
import StringBinding from '../share/StringBinding'
import './Document.css'

class Document extends Component {

  constructor() {
    super()
    this.state = {
      subscribed: false
    }
  }

  componentWillMount() {
    const { params, getDocument } = this.props
    this.doc = getDocument(params.id)
    this.doc.subscribe(() => {

      this.setState({ subscribed: true })

      // Increment the view count.
      this.doc.submitOp({p:["views"], na: 1})

      // Initialize the state.
      this.updateStateFromDoc()

      // Update the state on any doc change.
      this.doc.on('op', this.updateStateFromDoc.bind(this))
    })
  }

  updateStateFromDoc() {
    this.setState(this.doc.data)
  }

  render() {
    const doc = this.doc
    if(this.state.subscribed){
      return (
        <div className="container">

          <StringBinding
            className="document-title document-field"
            type="input"
            doc={doc}
            path={["title"]}
          />

          <StringBinding type="textarea" doc={doc} path={["description"]} />

          <StringBinding type="textarea" doc={doc} path={["content"]} />

          <div>{this.state.views} views</div>
          <div>Created on {this.state.createdDate}</div>
          <div>Last updated {this.state.updatedDate}</div>
        </div>
      )
    }
    else {
      return null
    }
  }
}

export default withShare(withRouter(Document))
