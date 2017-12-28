import React from 'react'
import { Router } from '../../routes'
import Page from '../../components/page'
import { deleteDocument } from '../../db/actions'
import createViewPage from '../views/viewPageComponentFactory'
import EditPageContent from './editPageContent'

class EditPage extends React.Component {

  // This gets called after the user clicks through the delete confirm modal.
  deleteDocumentAndNavigate (doc) {
    deleteDocument(doc, err => {
      if (err) {
        return console.error(err)
      }

      Router.pushRoute('profile', {
        username: this.props.user.username
      })
    })
  }

  render () {
    return (
      <EditPageContent {...this.props} onDocumentDelete={() => this.deleteDocumentAndNavigate(this.props.doc)}/>
    )
  }
}

export default Page(createViewPage(EditPage, {includeCSS: '/static/codemirror/codemirror.min.css'}))
