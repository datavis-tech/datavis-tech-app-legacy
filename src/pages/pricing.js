import React from 'react'
import { Icon, Table, Header } from 'semantic-ui-react'
import Page from '../components/page'
import Layout from '../components/layout'
import Spacer from '../components/spacer'

const PricingTable = () => (
  <Table definition celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell />
        <Table.HeaderCell>Free</Table.HeaderCell>
        <Table.HeaderCell>Early Adopter</Table.HeaderCell>
        <Table.HeaderCell>Basic</Table.HeaderCell>
        <Table.HeaderCell>Enterprise</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <Table.Cell>Real-time Collaboration</Table.Cell>
        <Table.Cell textAlign='center'>
          <Icon color='green' name='checkmark' size='large' />
        </Table.Cell>
        <Table.Cell textAlign='center'>
          <Icon color='green' name='checkmark' size='large' />
        </Table.Cell>
        <Table.Cell textAlign='center'>
          <Icon color='green' name='checkmark' size='large' />
        </Table.Cell>
        <Table.Cell textAlign='center'>
          <Icon color='green' name='checkmark' size='large' />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Public Content</Table.Cell>
        <Table.Cell textAlign='center'>
          <Icon color='green' name='checkmark' size='large' />
        </Table.Cell>
        <Table.Cell textAlign='center'>
          <Icon color='green' name='checkmark' size='large' />
        </Table.Cell>
        <Table.Cell textAlign='center'>
          <Icon color='green' name='checkmark' size='large' />
        </Table.Cell>
        <Table.Cell textAlign='center'>
          <Icon color='green' name='checkmark' size='large' />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Private Content</Table.Cell>
        <Table.Cell textAlign='center'>
          <Icon color='red' name='x' size='large' />
        </Table.Cell>
        <Table.Cell textAlign='center'>
          <Icon color='green' name='checkmark' size='large' />
        </Table.Cell>
        <Table.Cell textAlign='center'>
          <Icon color='green' name='checkmark' size='large' />
        </Table.Cell>
        <Table.Cell textAlign='center'>
          <Icon color='green' name='checkmark' size='large' />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>On-site Deployment</Table.Cell>
        <Table.Cell textAlign='center'>
          <Icon color='red' name='x' size='large' />
        </Table.Cell>
        <Table.Cell textAlign='center'>
          <Icon color='red' name='x' size='large' />
        </Table.Cell>
        <Table.Cell textAlign='center'>
          <Icon color='red' name='x' size='large' />
        </Table.Cell>
        <Table.Cell textAlign='center'>
          <Icon color='green' name='checkmark' size='large' />
        </Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
)

export default Page(({ user }) => (
  <Layout title='Associates | Datavis.tech' user={user} hideNav>
    <Header as='h1'>Pricing</Header>

    <p>Datavis.tech is free to use for public content.</p>

    <p>If you log in now, you'll automatically be part of the "Early Adopter" plan.</p>

    <PricingTable />

  </Layout>
))
