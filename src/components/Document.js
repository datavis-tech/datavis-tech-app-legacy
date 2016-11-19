import React, { Component } from 'react'
import { withRouter } from 'react-router'
import withShare from '../share/withShare'
import StringBinding from '../share/StringBinding'
import { timeFormat } from 'd3-time-format'
import { now } from '../share/methods'

const dateFormat = timeFormat('%B %d, %Y')

// TODO see about abstracting elements common to Document and Vis
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
      doc.submitOp({p:['views'], na: 1})

      // Stash the doc reference for later use.
      this.doc = doc

      // Initialize the state.
      this.updateStateFromDoc()

      // Update the state on any doc change.
      doc.on('op', (op, isLocal) => {

        // If the content is changed locally, set the updatedDate to now.
        if(isLocal && op[0].p[0] !== 'updatedDate'){
          doc.submitOp({
            p: ['updatedDate'],
            od: doc.data.updatedDate,
            oi: now()
          })
        }

        this.updateStateFromDoc()
      })

      // Trigger first rendering with document.
      this.setState({ documentMounted: true })
    })
  }

  updateStateFromDoc() {
    console.log(this.doc.data);
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
            path={['title']}
          />

          <StringBinding
            className="form-control"
            type="textarea"
            rows="20"
            doc={this.doc}
            path={['content']}
          />

          <div className="row">
            <div className="col-md-9">
              <StringBinding
                className="form-control"
                type="textarea"
                rows="10"
                doc={this.doc}
                path={['description']}
              />
            </div>
            <div className="col-md-3">
              <div className="card card-block">
                <div>{views} views</div>
                <div>Created {created}</div>
                <div>Updated {updated}</div>
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
