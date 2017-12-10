import React from 'react'

import Page from '../../components/page'
import Subscription from '../../components/subscription'
import ProfileQuerySubscription from '../../db/subscriptions/profileQuerySubscription'
import {profile} from '../../db/accessors'
import Layout from '../../components/layout'
import Loader from '../../components/loader'
import ProfileBody from './profileBody'
import resolveDocumentsSubscription from './resolveDocumentsSubscription'

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
            ({data, isReady}) => (
              <Loader ready={isReady}>
                {
                  data
                    ? <ProfileBody
                      profile={profile(data)}
                      documentsSubscription={resolveDocumentsSubscription(user, data)}
                    />
                    : <div data-test='notFound'>User not found</div>
                }
              </Loader>
            )
          }
        </Subscription>
      </Layout>
    )
  }

}

export default Page(ProfilePage)
