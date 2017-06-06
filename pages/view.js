import React from 'react'
import Page from '../components/page'
import Layout from '../components/layout'

class ViewPage extends React.Component {
  static async getInitialProps ({ query }) {
    return { id: query.id }
  }

  render () {
    const { id, user } = this.props

    const userJSON = JSON.stringify(user, null, 2)

    return (
      <Layout title={id + ' | Datavis.tech'}>
        <h1>{id}</h1>
        <pre>{userJSON}</pre>
      </Layout>
    )
  }
}

export default Page(ViewPage)
