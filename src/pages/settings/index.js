import React from 'react'
import { Header } from 'semantic-ui-react'
import StripeCheckout from 'react-stripe-checkout'
import { Link } from '../../routes'
import { EARLY_ADOPTER, EARLY_ADOPTER_COST, EARLY_ADOPTER_COST_DISPLAY } from '../../server/stripe/plans'
import ProfileSubscription from '../../db/subscriptions/profileSubscription'
import { profile } from '../../db/accessors'
import Subscription from '../../components/subscription'
import Page from '../../components/page'
import Layout from '../../components/layout'
import Loader from '../../components/loader'
import LoginButton from '../../components/loginButton'
import stripePublishableKey from '../../config/stripePublishableKey'
import DonwgradeConfirmationModal from './downgradeConfirmationModal'
import onStripeToken from './onStripeToken'
import cancel from './cancel'

class Settings extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showDowngradeConfirmationModal: false
    }
    if (this.props.user) {
      this.subscription = ProfileSubscription({ id: this.props.user.id })
    }
  }

  render () {

    const { user } = this.props

    return (
      <Layout title='Settings | Datavis.tech' user={user} >
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
                          <p>Note: If you recently upgraded, you may need to sign out and sign in again for your new plan to take effect.</p>
                          <p>
                            {
                              this.renderButton(profile(data) || {})
                            }
                          </p>
                          <p>
                            See also
                            <Link route='/pricing'>
                              <a> pricing</a>
                            </Link>
                            .
                          </p>
                        </div>
                      }
                    </Loader>
                  )
                }
              </Subscription>
            )
            : <p data-test='noUser'>Please <LoginButton /> to see your settings.</p>
        }
        <DonwgradeConfirmationModal
          show={this.state.showDowngradeConfirmationModal}
          onConfirm={cancel}
          onClose={() => this.setState({showDowngradeConfirmationModal: false})}
        />
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
        description={`Early Adopter Plan - ${EARLY_ADOPTER_COST_DISPLAY}/mo`}
        image='/static/images/logo/Logo_Icon_128px.png'
        amount={EARLY_ADOPTER_COST}
        currency='USD'
        token={onStripeToken}
        stripeKey={stripePublishableKey}
      />
    )
  }

  renderDowngradeButton () {
    return <button onClick={() => this.setState({showDowngradeConfirmationModal: true})}>Downgrade</button>
  }
}

export default Page(Settings)
