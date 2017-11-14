import React from 'react'

import Page from '../../components/page'
import Layout from '../../components/layout'
import createProfileQuery from '../../db/createProfileQuery'
import createDocumentsQuery from '../../db/createDocumentsQuery'
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
      profileLoading: true,
      profile: null,
      documents: null,
      documentsLoading: true
    }

    this.queries = []
  }

  componentDidMount () {
    const username = this.props.username

    // TODO refactor to use <Subscription ... >
    this.profileQuery = createProfileQuery({ username }, (profile) => {
      this.setState({
        profile,
        profileLoading: false
      })
      if (profile && !this.documentsQuery) {
        const owner = profile.id

        // TODO refactor to use <Subscription ... >
        this.documentsQuery = createDocumentsQuery(owner, (documents) => {
          this.setState({
            documents,
            documentsLoading: false
          })
        })
      }
    })
  }

  // TODO refactor to use <Subscription ... >,
  // so we won't need this logic here.
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
      profileLoading,
      profile,
      documents,
      documentsLoading
    } = this.state

    return (
      <Layout title={username + ' | Datavis.tech'} user={user}>
        <ProfileBody
          profileLoading={profileLoading}
          profile={profile}
          documentsLoading={documentsLoading}
          documents={documents}
        />
      </Layout>
    )
  }
}

export default Page(ProfilePage)
