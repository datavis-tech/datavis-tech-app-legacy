import React, { Component } from 'react'
import uuid from 'node-uuid'
import CreateForm from './CreateForm'

export default class CreateFormContainer extends Component {

  constructor() {
    super()

    this.createDocument = (title, description) => {
      const id = uuid.v4()
      const doc = this.context.connection.get('documents', id)
      const initialContent = { title, description}

      console.log("creating document")
      doc.create(initialContent, () => {
        console.log("created document")
        console.log(doc)
      })
    }

  }

  render() {
    return <CreateForm createDocument={this.createDocument}/>
  }
}

CreateFormContainer.contextTypes = {
  connection: React.PropTypes.object
}
