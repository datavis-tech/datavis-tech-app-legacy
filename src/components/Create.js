import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../actionCreators'

const Create = () => (
  <div className="container">
    <h1>Create</h1>
    <form>
      <div className="form-group row">
        <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
        <div className="col-sm-10">
          <input type="text" className="form-control" id="title"/>
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
        <div className="col-sm-10">
          <textarea className="form-control" id="description" rows="3"></textarea>
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

export default connect(null, actionCreators)(Create)
