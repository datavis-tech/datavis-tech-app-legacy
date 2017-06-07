import React from 'react'
import Page from '../components/page'
import Layout from '../components/layout'

class EditPage extends React.Component {
  static async getInitialProps ({ query }) {
    return { id: query.id }
  }

  render () {
    const { id, user } = this.props

    return (
      <Layout title={id + ' | Datavis.tech'} user={user}>
        <h1>Editing {id}</h1>
      </Layout>
    )
  }
}

export default Page(EditPage)
