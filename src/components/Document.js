import React, { Component } from 'react'
import { withRouter } from 'react-router'
import withShare from '../share/withShare'
import StringBinding from '../share/StringBinding'

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
      this.setState({
        subscribed: true
      })
      this.setState(this.doc.data)
    })
  }

  render() {
    const doc = this.doc
    if(this.state.subscribed){
      return (
        <div className="container">
          <StringBinding type="input" doc={doc} path={["title"]} />
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
