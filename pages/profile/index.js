import React from 'react'
import { Grid } from 'semantic-ui-react'

import Page from '../../components/page'
import Layout from '../../components/layout'
import connection from '../../modules/shareDBConnection'
import { DB_USERS_COLLECTION } from '../../modules/constants'
import ProfileCard from './profileCard'

class ProfilePage extends React.Component {
  static async getInitialProps ({ query }) {
    return {
      username: query.username
    }
  }

  constructor (props) {
    super(props)
    this.state = {
      profile: null
    }
  }

  componentDidMount () {

    // Find profile data by username.
    // Draws from https://github.com/share/sharedb/blob/master/examples/leaderboard/client/Leaderboard.jsx
    const mongoQuery = {
      username: this.props.username
    }
    this.profileQuery = connection.createSubscribeQuery(DB_USERS_COLLECTION, mongoQuery)
    const update = () => {
      const results = this.profileQuery.results
      if (results.length === 1) {
        this.setState({
          profile: results[0].data
        })
      }
      // TODO show when a user is not found
    }
    this.profileQuery.on('ready', update)
    this.profileQuery.on('changed', update)
  }

  componentWillUnmount () {
    this.profileQuery.destroy()
  }

  render () {
    const {
      username, // The username for the profile we're viewing.
      user // The currently logged in user.
    } = this.props

    const { profile } = this.state

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
