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
            className="form-control form-control-lg"
            type="input"
            doc={doc}
            path={["title"]}
          />

          <StringBinding
            className="form-control"
            type="textarea"
            rows="20"
            doc={doc}
            path={["content"]}
          />

          <div className="row">
            <div className="col-sm-9 p-r-0">
              <StringBinding
                className="form-control"
                type="textarea"
                rows="10"
                doc={doc}
                path={["description"]}
              />
            </div>
            <div className="col-sm-3 p-l-0">
              <div className="card card-block">
                <div>{this.state.views} views</div>
                <div>Created on {this.state.createdDate}</div>
                <div>Last updated {this.state.updatedDate}</div>
              </div>
            </div>
          </div>
        </div>
      )
    }
    else {
      return null
    }
  }
}

export default withShare(withRouter(Document))
