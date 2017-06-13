import {
  Container,
  Header,
  Input,
  List,
  Button,
  Checkbox,
  Form,
  Segment,
  Label,
  Icon,
  Grid,
  Card,
  Image,
  Menu
} from 'semantic-ui-react'
import Page from '../components/page'

import Link from 'next/link'
import Layout from '../components/layout'
import Spacer from '../components/spacer'
import HugeLogo from '../components/hugeLogo'

const Callout = () => (
  <Segment textAlign='center'>
    <strong>To get the conversation started, reach out to <a href='mailto:curran@datavis.tech'>curran@datavis.tech</a> today!</strong>
  </Segment>
)

export default Page(({ user }) => (
  <Layout title='Associates | Datavis.tech' user={user} hideNav>
    <HugeLogo/>

    <Header as='h1'>Become a Datavis Tech Associate</Header>

    <p>Datavis Tech INC. will handle the business and planning side of projects, while you as an associate will enjoy a competitive hourly rate for your remote collaboration on designing and developing data visualizations. We are only bringing on new associates who are experienced data visualization practitioners.</p>

    <Callout/>

    <Header as='h2'>What to Expect as an Associate</Header>

    <p>After you join the Datavis Tech team as an associate, expect the following process:</p>

    <ul>
      <li>You'll be notified when there's a new project opportunity and asked if you'd like to participate.</li>
      <li>You'll join in the project exploration conference call, in which we get to know the client and have a conversation identifying their requirements. * </li>
      <li>You'll help build a Proof of Concept with sample data provided by the client. *</li>
      <li>You'll help iterate a Statement of Work for the project, which defines the scope of the project. *</li>
      <li>You'll participate in design, prototyping, and development of interactive data visualizations.</li>
      <li>You'll use an issue tracker and a Git-based development workflow.</li>
      <li>You'll review the contributions of others and provide feedback (code reviews).</li>
      <li>You'll participate in weekly client calls where we present progress and get feedback.</li>
      <li>You'll be paid as a 1099 employee (contractor) on a monthly payroll cycle, according to an agreed upon hourly rate with upper and lower bounds on your per-week hours (e.g. between 5 and 10 hours per week).</li>
    </ul>

    <p>* For tasks noted with an asterisk, you'll be paid your hourly rate for this work only if we get the project.</p>

    <Callout/>
    <Spacer/>
  </Layout>
))
