import React from 'react'
import { Container, Header } from 'semantic-ui-react'
import RecentDocumentQuerySubscription from '../db/subscriptions/recentDocumentQuerySubscription'
import { serializeDocument } from '../db/serializers'
import Subscription from '../components/subscription'
import Page from '../components/page'
import Layout from '../components/layout'
import Loader from '../components/loader'
import Spacer from '../components/spacer'
import HugeLogo from '../components/hugeLogo'
import DocumentsList from '../components/documentsList'

// TODO: test
export default Page(({ user }) => (
  <Layout title='Datavis.tech' user={user}>
    <Container text>
      <Spacer space='60px' />
      <HugeLogo noLink />
      <Spacer space='10px' />
      <Container textAlign='center'>
        <Header as='h1'>A collaborative data visualization platform.</Header>
      </Container>
      <Spacer space='50px' />
      <p style={{fontSize: '1.5em', textAlign: 'center'}}>You can use this site to publish datasets and create visualizations, collaborating with others in real time.</p>
      <Spacer space='50px' />
    </Container>
    <Subscription subscription={RecentDocumentQuerySubscription()} >
      {
        ({data: documents, isReady}) => (
          <Loader ready={isReady}>
            <DocumentsList documents={(documents || []).map(serializeDocument)} />
          </Loader>
        )
      }
    </Subscription>
  </Layout>
))
