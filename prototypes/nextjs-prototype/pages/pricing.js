import {
  Container,
  Header,
  Input,
  Button,
  Checkbox,
  Form,
  Menu
} from 'semantic-ui-react'
import { PublicPage } from 'next-github-auth'
import Layout from '../components/layout'
import NavbarSecret from '../components/navbarSecret'

export default PublicPage(() => (
  <Layout NavbarComponent={NavbarSecret}>
    <Header as='h2'>Pricing</Header>
    <Header as='h3'>Free Plan</Header>
    <p>
      Create and collaboratively evolve datasets and visualizations that are open to the public.
    </p>
    <p>
      The code is Open Source, and the data is Open Data.
    </p>
    <Header as='h3'>Basic Plan</Header>
    <p>
      Create and collaboratively evolve datasets and visualizations that are closed to the public.
    </p>
    <p>
      Useful for companies or consultants to use for developing proprietary data visualizations.
    </p>
    <ul>
      <li>$7 per month</li>
      <li>Unlimited storage</li>
      <li>Unlimited collaborators</li>
    </ul>
    <Button primary>Upgrade Now</Button>
  </Layout>
))
// <li><strong>Professional</strong> $20/mo Unlimited storage, unlimited collaborators, teams.</li>
// <li><strong>Enterprise</strong> $10,000/year Installation on your own infrastructure.</li>
