import React from 'react'
import { Router } from '../../routes'
import Page from '../../components/page'
import Layout from '../../components/layout'
import EditPageContent from './editPageContent'

class EditPage extends React.Component {

  // TODO test
  static async getInitialProps ({ req, query }) {
    // if it is called on the server, we need pollyfil fetch first
    if (req) {
      require('isomorphic-fetch')
    }

    const [documentRepsonse, referencesResponse] = await Promise.all([
      /* global fetch:false */
      fetch(`http://localhost:3000/rest/documents/${query.id}`),
      fetch(`http://localhost:3000/rest/documents/${query.id}/references`)
    ])

    const document = await documentRepsonse.json()
    const references = (await referencesResponse.json()) || []

    return { id: query.id, document, references }
  }

  constructor (props) {
    super(props)

    this.navigateToProfile = () => {
      Router.pushRoute('profile', {
        username: this.props.user.username
      })
    }
  }

  // TODO test
  componentDidMount () {
    const { store, document, references } = this.props
    store.add([document, ...references])
  }

  render () {
    const { id, user, document, store } = this.props

    return (
      <Layout title={document.title} user={user}>
        <EditPageContent
          id={id}
          user={user}
          documentStore={store}
          onDocumentDelete={this.navigateToProfile}
        />
      </Layout>
    )
  }
}

export default Page(EditPage)
