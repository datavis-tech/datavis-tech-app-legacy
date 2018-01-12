import React from 'react'
import { Icon, Table, Header, Button } from 'semantic-ui-react'
import Page from '../components/page'
import Layout from '../components/layout'

const features = [
  { key: 'realtime', title: 'Real-time Collaboration' },
  { key: 'public', title: 'Unlimited Public Content' },
  { key: 'private', title: 'Unlimited Private Content' }
  //  { key: 'onsite', title: 'On-site Deployment' }
]

const plans = [
  { name: 'Free Plan', realtime: true, public: true },
  { name: 'Early Adopter Plan ($5.99 per month)', realtime: true, public: true, private: true }
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
  <Layout title='Pricing | Datavis.tech' user={user} hideFeedback >
    <Header as='h1'>Pricing</Header>

    <p>Datavis.tech is free to use for public content, paid for private content.</p>

    <PricingTable />

    <Button primary floated='right'>Upgrade to the Early Adopter Plan</Button>

  </Layout>
))
