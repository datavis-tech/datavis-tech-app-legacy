import React from 'react'
import { Icon, Table, Header, Button } from 'semantic-ui-react'
import { Link } from '../routes'
import Page from '../components/page'
import Layout from '../components/layout'
import { EARLY_ADOPTER_COST_DISPLAY } from '../server/stripe/plans'

const features = [
  { key: 'realtime', title: 'Real-time Collaboration' },
  { key: 'public', title: 'Unlimited Public Content' },
  { key: 'private', title: 'Unlimited Private Content' }
  //  { key: 'onsite', title: 'On-site Deployment' }
]

const plans = [
  { name: 'Free Plan', realtime: true, public: true },
  { name: `Early Adopter Plan (${EARLY_ADOPTER_COST_DISPLAY} per month)`, realtime: true, public: true, private: true }
  // { name: 'Paid ($7/mo)', disabled: true, realtime: true, public: true, private: true },
  // { name: 'Enterprise', disabled: true, realtime: true, public: true, private: true, onsite: true }
]

const PricingTable = () => (
  <Table definition celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell />
        {
          plans.map(({name}) => (
            <Table.HeaderCell textAlign='center' key={name}>
              {name}
            </Table.HeaderCell>
          ))
        }
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {
        features.map(({key, title}) => (
          <Table.Row key={key}>
            <Table.Cell textAlign='center'>{title}</Table.Cell>
            {
              plans.map(plan => (
                <Table.Cell key={plan.name} textAlign='center'>
                  {
                    plan[key]
                      ? <Icon color='green' name='checkmark' size='large' />
                      : <Icon color='red' name='x' size='large' />
                  }
                </Table.Cell>
              ))
            }
          </Table.Row>
        ))
      }
    </Table.Body>
  </Table>
)

export default Page(({ user }) => (
  <Layout title='Pricing | Datavis.tech' user={user} >
    <Header as='h1'>Pricing</Header>

    <p>Datavis.tech is free for public content, paid for private content.</p>

    <p>For a limited time we are offering a special low price "Early Adopter" plan for our first customers.</p>

    <PricingTable />

    <Link route='/settings'>
      <a>
        <Button primary floated='right'>Change Plan</Button>
      </a>
    </Link>

  </Layout>
))
