import React, { Component } from 'react'
import TitleFormGroup from './TitleFormGroup'
import DescriptionFormGroup from './DescriptionFormGroup'
import ContentUploadFormGroup from './ContentUploadFormGroup'

export default class CreateForm extends Component {
  constructor() {
    super()

    this.state = {

      // The text from the title input field.
      title: "",

      // A flag to trigger validation feedback
      // when the form was submitted with no title present.
      titleDanger: false,

      // The text from the description input field.
      description: "",

      // A flag to signify that the document is being created.
      creating: false
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

    const {
      state: { title, description },
      props: { createDocument, router }
    } = this

    event.preventDefault()

    if(!title){
      this.setState({ titleDanger: true })
      this.focusTitle()
    } else {
      this.setState({ creating: true })
      createDocument(title, description)
        .then((id) => router.push("/" + id))
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
      <div className="container m-t-1">
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
              <button
                type="submit"
                className="btn btn-primary"
                disabled={this.state.creating}
              >
                Create
              </button>
              {(() => {
                if(this.state.creating){
                  return (
                    <div className="m-t-1">
                      Creating document...
                    </div>
                  )
                }
              })()}
            </div>
          </div>
        </form>
      </div>
    )
  }
}
