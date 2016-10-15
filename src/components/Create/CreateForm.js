import React, { Component } from 'react'
import TitleFormGroup from './TitleFormGroup'
import DescriptionFormGroup from './DescriptionFormGroup'
import ContentUploadFormGroup from './ContentUploadFormGroup'

export default class Create extends Component {
  constructor() {
    super()

    this.state = {
      title: "",
      titleDanger: false,
      description: ""
    }

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
      this.titleInput.focus()
    } else {
      this.props.createDocument(title, description)
    }
  }
  
  componentDidMount() {
    if(this.titleInput){
      this.titleInput.focus()
    }
  }

  render() {
    const titleDanger = this.state.titleDanger
    return (
      <div className="container m-t-1">
        <h1>Create a Document</h1>
        <form onSubmit={this.handleSubmit}>

          <TitleFormGroup
            titleDanger={titleDanger}
            handleChange={this.handleChange}
            setTitleInput={(input) => this.titleInput = input}
          />

          <DescriptionFormGroup handleChange={this.handleChange} />

          <ContentUploadFormGroup />

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
