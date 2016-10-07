import React, { Component }from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../actionCreators'

class Create extends Component {
  constructor() {
    super()
    this.state = { title: "", description: "" }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange({ target: {id, value}}) {
    this.setState({ [id]: value })
  }

  handleSubmit(event) {
    event.preventDefault()
    const { title, description } = this.state
    if(!title){
      console.log('Missing title! TODO handle validation styles')
    } else {
      console.log(`TODO submit Redux action CREATE_DOCUMENT(${title}, ${description})`)
    }
  }

  render() {
    return (
      <div className="container">
        <h1>Create a Document</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group row">

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
