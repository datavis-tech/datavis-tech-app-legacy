import React from 'react'
import { Header } from 'semantic-ui-react'
import Page from '../../components/page'
import Layout from '../../components/layout'
import StripeCheckout from 'react-stripe-checkout'
import onStripeToken from './onStripeToken'
import stripePublishableKey from '../../config/stripePublishableKey'

export default Page(({ user }) => {
  return (
    <Layout title='Settings | Datavis.tech' user={user} hideFeedback >
      <Header as='h1'>Settings</Header>
      <p>You are currently on the <strong>Free</strong> plan.</p>
      <StripeCheckout
        label='Upgrade to the Early Adopter Plan'
        name='Datavis Tech INC.'
        description='Early Adopter Plan - $5/mo'
        image='/static/images/logo/Logo_Icon_128px.png'
        amount={399}
        currency='USD'
        token={onStripeToken}
        stripeKey={stripePublishableKey}
      />
    </Layout>
  )
})
