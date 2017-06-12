import React from 'react'
import { Grid } from 'semantic-ui-react'

import Page from '../../components/page'
import Layout from '../../components/layout'
import ProfileCard from './profileCard'
import createProfileQuery from './createProfileQuery'

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

      const userId = profile.id
      console.log(userId)
    })
  }

  componentWillUnmount () {
    if(this.profileQuery){
      this.profileQuery.destroy()
    }
  }

  render () {
    const {
      username, // The username for the profile we're viewing.
      user // The currently logged in user.
    } = this.props

    const {
      profile,
      profileNotFound
    } = this.state

    return (
      <Layout title={username + ' | Datavis.tech'} user={user}>
        <Grid>
          <Grid.Column width={6}>
            {profile ? <ProfileCard profile={profile}/> : null }
          </Grid.Column>
          <Grid.Column width={10}/>
        </Grid>
      </Layout>
    )
  }
}

export default Page(ProfilePage)
