import React from 'react'
import { Header } from 'semantic-ui-react'
import StripeCheckout from 'react-stripe-checkout'
import { EARLY_ADOPTER } from '../../server/stripe/plans'
import ProfileSubscription from '../../db/subscriptions/profileSubscription'
import { profile } from '../../db/accessors'
import Subscription from '../../components/subscription'
import Page from '../../components/page'
import Layout from '../../components/layout'
import Loader from '../../components/loader'
import stripePublishableKey from '../../config/stripePublishableKey'
import onStripeToken from './onStripeToken'
import cancel from './cancel'

class Settings extends React.Component {
  constructor (props) {
    super(props)
    this.subscription = ProfileSubscription({ id: this.props.user.id })
  }

  render () {

    const { user } = this.props

    return (
      <Layout title='Settings | Datavis.tech' user={user} hideFeedback >
        <Header as='h1'>Settings</Header>
        {
          user
            ? (
              <Subscription subscription={this.subscription} >
                {
                  ({ data, isReady }) => (
                    <Loader ready={isReady}>
                      {
                        <div>
                          <p>You are currently on the <strong data-test='plan'>{ this.renderPlan(profile(data) || {}) }</strong> plan.</p>
                          {
                            this.renderButton(profile(data) || {})
                          }
                        </div>
                      }
                    </Loader>
                  )
                }
              </Subscription>
            )
            : <p data-test='noUser'>Please log in to see your settings.</p>
        }
      </Layout>
    )
  }

  renderPlan (profile) {
    return profile.subscriptionPlan === EARLY_ADOPTER ? 'Early Adopter' : 'Free'
  }

  renderButton (profile) {
    return profile.subscriptionPlan === EARLY_ADOPTER ? this.renderDowngradeButton() : this.renderUpgradeButton()
  }

  renderUpgradeButton () {
    return (
      <StripeCheckout
        label='Upgrade to the Early Adopter Plan'
        name='Datavis Tech INC.'
        description='Early Adopter Plan - $3.99/mo'
        image='/static/images/logo/Logo_Icon_128px.png'
        amount={399}
        currency='USD'
        token={onStripeToken}
        stripeKey={stripePublishableKey}
      />
    )
  }

  renderDowngradeButton () {
    return <button onClick={cancel}>Downgrade</button>
  }
}

export default Page(Settings)
