import React from 'react'

import Page from '../../components/page'
import Subscription from '../../components/subscription'
import ProfileQuerySubscription from '../../db/subscriptions/profileQuerySubscription'
import {profile} from '../../db/accessors'
import Layout from '../../components/layout'
import Loader from '../../components/loader'
import ProfileBody from './profileBody'

class ProfilePage extends React.Component {

  static async getInitialProps ({ query }) {
    return {
      username: query.username
    }
  }

  constructor (props) {
    super(props)
    this.subscription = ProfileQuerySubscription({username: this.props.username})
  }

  render () {

    const {user, username} = this.props

    return (
      <Layout title={`${username} | Datavis.tech`} user={user}>
        <Subscription subscription={this.subscription} >
          {
            ({data: profileDoc, isReady}) => (
              <Loader ready={isReady}>
                <ProfileBody profile={profile(profileDoc)} />
              </Loader>
            )
          }
        </Subscription>
      </Layout>
    )
  }

}

export default Page(ProfilePage)
