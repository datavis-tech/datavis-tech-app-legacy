import React from 'react'
import { Button, Header } from 'semantic-ui-react'
import Page from '../components/page'
import Layout from '../components/layout'
import StripeCheckout from 'react-stripe-checkout'

const onToken = token => {
  fetch('/stripe/earlyAdopterUpgrade', {
    method: 'POST',
    body: JSON.stringify(token),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }).then(response => {
    response.json().then(data => {
      console.log(data)
    });
  });
}

export default Page(({ user }) => {
  if(global.fetch){
    onToken({testing:'shiot'})
  }

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
        token={onToken}
        stripeKey='pk_test_Y4thsPih1A0NNySQzyX7DQEi'
      />
    </Layout>
  )
})
