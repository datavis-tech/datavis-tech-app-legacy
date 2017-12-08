import React from 'react'
import { Icon, Table, Header } from 'semantic-ui-react'
import Page from '../components/page'
import Layout from '../components/layout'

const features = [
  { key: 'realtime', title: 'Real-time Collaboration' },
  { key: 'public', title: 'Public Content' },
  { key: 'private', title: 'Private Content' },
  { key: 'onsite', title: 'On-site Deployment' }
]

const plans = [
  { name: 'Free', realtime: true, public: true },
  { name: 'Early Adopter', realtime: true, public: true, private: true },
  { name: 'Paid', realtime: true, public: true, private: true },
  { name: 'Enterprise', realtime: true, public: true, private: true, onsite: true }
]

const PricingTable = () => (
  <Table definition celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell />
        {
          plans.map(({name}) => (
            <Table.HeaderCell key={name}>{name}</Table.HeaderCell>
          ))
        }
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {
        features.map(({key, title}) => (
          <Table.Row key={key}>
            <Table.Cell>{title}</Table.Cell>
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

    <p>Datavis.tech is free to use for public content.</p>
    <p>If you log in now, you'll automatically be part of the "Early Adopter" plan (for a limited time only).</p>

    <PricingTable />

    <p>Paid plan coming soon!</p>

  </Layout>
))
