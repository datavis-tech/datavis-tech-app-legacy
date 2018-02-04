import React from 'react'
import { Button, Header } from 'semantic-ui-react'
import Page from '../components/page'
import Layout from '../components/layout'

export default Page(({ user }) => (
  <Layout title='Settings | Datavis.tech' user={user} hideFeedback >
    <Header as='h1'>Settings</Header>
    <p>You are currently on the <strong>Free</strong> plan.</p>
    <Button primary>Upgrade to the Early Adopter Plan</Button>
  </Layout>
))
