import React from 'react'
import { Grid } from 'semantic-ui-react'
import Subscription from '../../components/subscription'
import Loader from '../../components/loader'
import ProfileCard from './profileCard'
import DocumentsList from './documentsList'
import { serializeDocument } from '../../db/serializers'

export default ({profile, documentsSubscription}) => (
  <div>
    <Grid centered>
      <ProfileCard profile={profile} />
    </Grid>
    <Subscription subscription={documentsSubscription}>
      {
        ({data, isReady}) => {

          // Reverse order so documents are ordered from most recent to least recent.
          const documents = (data || []).reverse()

          return (
            <Loader ready={isReady}>
              <DocumentsList documents={documents.map(serializeDocument)} />
            </Loader>
          )
        }
      }
    </Subscription>
  </div>
)
