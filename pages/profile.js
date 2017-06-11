import React from 'react'
import Page from '../components/page'
import Layout from '../components/layout'
import connection from '../modules/shareDBConnection'
import { DB_USERS_COLLECTION } from '../modules/constants'

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
    this.query = connection.createSubscribeQuery(DB_USERS_COLLECTION, mongoQuery)
    const update = () => {
      const results = this.query.results
      if(results.length === 1){
        this.setState({
          profile: results[0].data
        })
      }
      // TODO show when a user is not found
    }
    this.query.on('ready', update);
    this.query.on('changed', update);
  }

  componentWillUnmount () {
    this.query.destroy()
  }

  render () {
    const {
      username, // The username for the profile we're viewing.
      user // The currently logged in user.
    } = this.props

    return (
      <Layout title={username + ' | Datavis.tech'} user={user}>
        <h1>{username}</h1>
        {this.state.profile ?
            <div>{this.state.profile.displayName}</div>
          :
            null
        }
      </Layout>
    )
  }
}

export default Page(ProfilePage)
