import React from 'react'
import {Router} from '../../routes'
import Page from '../../components/page'
import ViewPage from '../../components/viewPage/viewPage'
import {deleteDocument} from '../../db/actions'
import {profile} from '../../db/accessors'
import EditPageContent from './editPageContent'

class EditPage extends React.Component {

  static async getInitialProps ({query}) {
    return {
      id: query.id
    }
  }

  // This gets called after the user clicks through the delete confirm modal.
  deleteDocumentAndNavigate (doc) {
    deleteDocument(doc, err => {
      if (err) {
        return console.error(err)
      }

      Router.pushRoute('profile', {
        username: profile(this.props.user).username
      })
    })
  }

  render () {
    const {id, user} = this.props
    return (
      <ViewPage id={id}>
        {({doc, error}) => (
          <EditPageContent
            id={id}
            user={user}
            doc={doc}
            error={error}
            onDocumentDelete={() => this.deleteDocumentAndNavigate(doc)}
          />
        )}
      </ViewPage>
    )
  }
}

export default Page(EditPage)
