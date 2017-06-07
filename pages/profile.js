import React from 'react'
import Page from '../components/page'
import Layout from '../components/layout'

class ProfilePage extends React.Component {
  static async getInitialProps ({ query }) {
    return { username: query.username }
  }

  render () {
    const {
      username, // The username for the profile we're viewing.
      user, // The currently logged in user.
    } = this.props

    return (
      <Layout title={username + ' | Datavis.tech'} user={user}>
        <h1>{username}</h1>
      </Layout>
    )
  }
}

export default Page(ProfilePage)
