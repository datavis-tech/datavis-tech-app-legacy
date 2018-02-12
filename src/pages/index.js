import React from 'react'
import { Container, Header } from 'semantic-ui-react'
import { Link } from '../routes'
import RecentVisualizationsQuerySubscription from '../db/subscriptions/recentDocumentQuerySubscription'
import { serializeDocument } from '../db/serializers'
import Subscription from '../components/subscription'
import Page from '../components/page'
import Layout from '../components/layout'
import Loader from '../components/loader'
import Spacer from '../components/spacer'
import HugeLogo from '../components/hugeLogo'
import DocumentPreviewList from '../pages/views/slots/documentPreviewList'
import { AUTH_PATH_GITHUB } from '../constants'

// TODO: test
export default Page(({ user }) => (
  <Layout title='Datavis.tech' user={user}>
    <Container text>
      <Spacer space='100px' />
      <HugeLogo noLink />
      <Spacer space='10px' />
      <Container textAlign='center'>
        <Header as='h1'>A collaborative data visualization platform.</Header>
      </Container>
      <Spacer space='100px' />
      <p style={{fontSize: '1.5em'}}>You can use this site to publish datasets and create visualizations, collaborating with others in real time.</p>
      <p style={{fontSize: '1.5em'}}>To get started, <a href={AUTH_PATH_GITHUB}>log in via GitHub authentication</a> and take a look around, or have a look at some <Link route='profile' params={{ username: 'curran' }}><a>examples.</a></Link></p>
      <Spacer space='20px' />
      <Container>
        <Subscription subscription={RecentVisualizationsQuerySubscription()} >
          {
            ({data: documents, isReady}) => (
              <Loader ready={isReady}>
                <DocumentPreviewList title='Recent visualizations' documents={(documents || []).map(serializeDocument)} />
              </Loader>
            )
          }
        </Subscription>
      </Container>
      <Spacer space='250px' />
    </Container>
  </Layout>
))
