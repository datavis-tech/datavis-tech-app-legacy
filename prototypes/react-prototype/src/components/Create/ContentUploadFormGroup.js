import React, { Component } from 'react'
import './ContentUploadFormGroup.css'

export default class ContentUploadFormGroup extends Component {

  constructor() {
    super()
    this.state = {}
  }
  
  handleChange() {

    const files = this.fileInput.files

    // files.length is 0 if no file was chosen.
    if(files.length > 0){
      const file = files[0]
      const reader = new FileReader()

      reader.addEventListener('load', () => {
        this.setChosenFile(file.name, reader.result)
      })

      reader.readAsText(file)
    } else {
      this.setChosenFile(null, null)
    }
  }

  setChosenFile(name, content){
    this.setState({ name, content })
    if(this.props.onFileChosen){
      this.props.onFileChosen(name, content)
    }
  }

  render() {
    return (
      <div className="form-group row">

        <label htmlFor="file" className="col-sm-2 col-form-label">
          <span>Content</span>
        </label>

        <div className="col-sm-10">
          <label className="custom-file">
            <input
              type="file"
              id="file"
              className="custom-file-input"
              ref={(input) => this.fileInput = input}
              onChange={this.handleChange.bind(this)}
            />
            <span
              className="custom-file-control"
              data-content-value={this.state.name || 'Choose file...'}
            />
          </label>
        </div>
      </div>
    )
  }
}
