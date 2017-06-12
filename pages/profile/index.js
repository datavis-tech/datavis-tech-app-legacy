import React from 'react'

import Page from '../../components/page'
import Layout from '../../components/layout'
import createProfileQuery from './createProfileQuery'
import createDocumentsQuery from './createDocumentsQuery'
import ProfileBody from './profileBody'

class ProfilePage extends React.Component {
  static async getInitialProps ({ query }) {
    return {
      username: query.username
    }
  }

  constructor (props) {
    super(props)

    this.state = {
      loading: true,
      profile: null
    }

    this.queries = []
  }

  componentDidMount () {
    const username = this.props.username
    this.profileQuery = createProfileQuery(username, (profile) => {
      this.setState({
        profile,
        loading: false
      })
      if (profile && !this.documentsQuery) {
        const owner = profile.id
        this.documentsQuery = createDocumentsQuery(owner, (documents) => {
          this.setState({ documents })
        })
      }
    })
  }

  componentWillUnmount () {
    if (this.profileQuery) {
      this.profileQuery.destroy()
    }
    if (this.documentsQuery) {
      this.documentsQuery.destroy()
    }
  }

  render () {
    const {
      username, // The username for the profile we're viewing.
      user // The currently logged in user.
    } = this.props

    const {
      loading,
      profile,
      documents
    } = this.state

    return (
      <Layout title={username + ' | Datavis.tech'} user={user}>
        <ProfileBody
          loading={loading}
          profile={profile}
          documents={documents}
        />
      </Layout>
    )
  }
}

export default Page(ProfilePage)
