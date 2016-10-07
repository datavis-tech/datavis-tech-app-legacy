import React, { Component }from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../actionCreators'
import classNames from 'classnames'

class Create extends Component {
  constructor() {
    super()
    this.state = { title: "", description: "" }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange({ target: {id, value}}) {
    this.setState({ [id]: value })

    if(id === "title" && value){
      this.setState({ titleDanger: false })
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    const { title, description } = this.state
    if(!title){
      this.setState({ titleDanger: true })
    } else {
      this.props.createDocument(title, description)
    }
  }

  render() {
    const titleDanger = this.state.titleDanger
    return (
      <div className="container m-t-1">
        <h1>Create a Document</h1>
        <form onSubmit={this.handleSubmit}>
          <div className={classNames("form-group row", {"has-danger": titleDanger})}>

            <label htmlFor="title" className="col-sm-2 col-form-label">
              Title
            </label>

            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="title"
                onChange={this.handleChange}
              />
            </div>

          </div>
          <div className="form-group row">

            <label htmlFor="description" className="col-sm-2 col-form-label">
              Description
            </label>

            <div className="col-sm-10">
              <textarea
                className="form-control"
                id="description"
                rows="3"
                onChange={this.handleChange}
              />
            </div>

          </div>
          <div className="form-group row">
            <div className="offset-sm-2 col-sm-10">
              <button type="submit" className="btn btn-primary">Create</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default connect(null, actionCreators)(Create)
