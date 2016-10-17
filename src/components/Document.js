import React, { Component } from 'react'
import { withRouter } from 'react-router'
import withShare from '../share/withShare'
import StringBinding from '../share/StringBinding'
import { timeFormat } from 'd3-time-format'

const dateFormat = timeFormat("%B %d, %Y")

class Document extends Component {

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
      doc.submitOp({p:["views"], na: 1})

      // Stash the doc reference for later use.
      this.doc = doc

      // Initialize the state.
      this.updateStateFromDoc()

      // Update the state on any doc change.
      doc.on('op', this.updateStateFromDoc.bind(this))

      // Trigger first rendering with document.
      this.setState({ documentMounted: true })
    })
  }

  updateStateFromDoc() {
    const { views, createdDate, updatedDate } = this.doc.data
    this.setState({
      views,
      created: dateFormat(new Date(createdDate)),
      updated: dateFormat(new Date(updatedDate))
    })
  }

  render() {

    const { views, created, updated, documentMounted } = this.state

    if(documentMounted){

      return (
        <div className="container">

          <StringBinding
            className="form-control form-control-lg"
            type="input"
            doc={this.doc}
            path={["title"]}
          />

          <StringBinding
            className="form-control"
            type="textarea"
            rows="20"
            doc={this.doc}
            path={["content"]}
          />

          <div className="row">
            <div className="col-sm-9 p-r-0">
              <StringBinding
                className="form-control"
                type="textarea"
                rows="10"
                doc={this.doc}
                path={["description"]}
              />
            </div>
            <div className="col-sm-3 p-l-0">
              <div className="card card-block">
                <div>{views} views</div>
                <div>Created on {created}</div>
                <div>Last updated {updated}</div>
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
