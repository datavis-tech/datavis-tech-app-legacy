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
    this.setTitleInput = this.setTitleInput.bind(this)
  }

  handleChange({ target: {id, value}}) {
    this.setState({ [id]: value })

    if(id === 'title' && value){
      this.setState({ titleDanger: false })
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    const { title, description } = this.state
    if(!title){
      this.setState({ titleDanger: true })
      this.focusTitle()
    } else {
      this.props.createDocument(title, description)
    }
  }

  setTitleInput(input){
    this.titleInput = input
  }

  focusTitle() {
    if(this.titleInput){
      this.titleInput.focus()
    }
  }
  
  componentDidMount() {
    this.focusTitle()
  }

  render() {
    const titleDanger = this.state.titleDanger
    return (
      <div className="container m-t-1" testHooks={{
        handleChange: this.handleChange,
        handleSubmit: this.handleSubmit
      }}>
        <h1>Create a Document</h1>
        <form onSubmit={this.handleSubmit}>

          <TitleFormGroup
            titleDanger={titleDanger}
            handleChange={this.handleChange}
            setTitleInput={this.setTitleInput}
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
