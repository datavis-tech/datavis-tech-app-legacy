import React from 'react'
import { Grid } from 'semantic-ui-react'
import DocumentsForOwnerSubscription from '../../db/subscriptions/documentsForOwnerSubscription'
import Subscription from '../../components/subscription'
import Loader from '../../components/loader'
import ProfileCard from './profileCard'
import DocumentsList from './documentsList'

export default ({profile}) => (
  <div>
    {
      !profile
        ? <div data-test='notFound'>User not found</div>
        : (
          <Grid>
            <Grid.Column width={4}>
              <ProfileCard profile={profile} />
            </Grid.Column>
            <Grid.Column width={12}>
              <Subscription subscription={DocumentsForOwnerSubscription({owner: profile.id})}>
                {
                  ({data, isReady}) => (
                    <Loader ready={isReady}>
                      <DocumentsList documents={data || []} />
                    </Loader>
                  )
                }
              </Subscription>
            </Grid.Column>
          </Grid>
        )
    }
  </div>
)
