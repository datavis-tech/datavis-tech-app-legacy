import React, { Component } from 'react'
import './ContentUploadFormGroup.css'

export default class ContentUploadFormGroup extends Component {

  constructor() {
    super()
    this.state = {

      // This is for displaying the name of the chosen file.
      chosenFileName: null
    }
  }
  
  handleChange(event) {

    // files.length is 0 if no file was chosen.
    const files = this.fileInput.files

    if(files.length > 0){
      const file = files[0]
      const reader = new FileReader()

      reader.addEventListener('load', () => {
        this.setState({
          chosenFileName: file.name,
          chosenFileContent: reader.result
        })
      });

      this.setState({
        chosenFileName: 'Loading...'
      })

      reader.readAsText(file)
    } else {
      this.setState({
        chosenFileName: null,
        chosenFileContent: null
      })
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
              data-content-value={
                this.state.chosenFileName || "Choose file..."
              }
            />
          </label>
        </div>
      </div>
    )
  }
}
