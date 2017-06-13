import { Header, Segment } from 'semantic-ui-react'
import Page from '../components/page'
import Layout from '../components/layout'
import Spacer from '../components/spacer'
import HugeLogo from '../components/hugeLogo'

const Callout = () => (
  <Segment textAlign='center'>
    <strong>To get the conversation started, reach out to <a href='mailto:curran@datavis.tech'>curran@datavis.tech</a> today!</strong>
  </Segment>
)

export default Page(({ user }) => (
  <Layout title='Consulting | Datavis.tech' user={user} hideNav>
    <HugeLogo/>

    <Header as='h1'>Data Visualization Consulting Services</Header>

    <p>Datavis Tech INC. offers consulting services for design and development of interactive data visualizations for the Web. We specialize in creative, collaborative projects in which your data is visualized using D3.js and other Open Source technologies. Given a data set or API to work with, and an understanding of the tasks you'd like visualization to facilitate, we can work with you to explore and present your data visually. Our projects typically last for several months, grounded in weekly meetings.</p>

    <Callout/>

    <Header as='h2'>What to Expect as a Client</Header>

    <ul>
      <li><strong>First exploratory call</strong>: After you reach out via email and describe your project, we will assemble a tentative team and schedule an exploratory phone meeting to get to know each other and discuss project requirements.</li>
      <li><strong>Proof of Concept</strong>: Next, we'll sketch out design ideas and develop a Proof of Concept visualization of your data. This process allows us to get familiar with the data at hand, and to verify that the project is feasible.</li>
      <li><strong style={{ color: 'red' }}>Fail Fast Note</strong>: If you are not able to provide us representative sample data at the beginning of the project, we will not be able to proceed.</li>
      <li><strong>Second exploratory call</strong>: After developing a Proof of Concept and drafting a Statement of Work, we'll schedule a second exploratory call in which you give us your reaction, identifying any adjustments required to the Statement of Work.</li>
      <li><strong>Project launch call</strong>: After we iterate on the Statement of Work and reach a mutual understanding of project scope and expected deliverables, we'll schedule a call to finalize the Statement of Work and officially launch the project. After this call, you'll be expected to e-sign the Statement of Work document (which serves as our contract as well), and we'll send an invoice for the retainer fee.</li>
      <li><strong>Weekly Cadence</strong>: After receiving payment for the retainer fee, we will begin our cadence of weekly meetings. During these meetings, we will present our progress, and listen to your feedback.</li>
      <li><strong style={{ color: 'red' }}>Fail Fast Note</strong>: We have found that weekly communication is critical for data visualization projects. If no one from your team is available to meet with us for 30 minutes a weekly basis, we will not be able to proceed.</li>
      <li><strong>Exploration</strong>: Towards the beginning of a project, we typically try out a number of visual encodings and interaction techniques for your data depending on your target audience and the tasks you wish to facilitate using interactive data visualization. During this phase we seek your critical feedback to guide which ideas stick, and which are thrown away.</li>
      <li><strong>Development</strong>: Towards the middle and end of a project, we focus on evolving the deliverables into a polished work, and also focus on enabling you to easily change configuration (e.g. colors and text) after we close out the project.</li>
      <li><strong>Milestone-based Payments</strong>: Throughout a project, for each milestone we reach, we will send an invoice with "due on receipt" terms of payment. Work for the subsequent milestones will only begin after we receive payment for the completed milestone. We encourage timely payments, as the project will be effectively "on ice" after we send an invoice and before we receive its payment. We accept mailed checks, credit/debit card payments, or other timely means of payment.</li>
      <li><strong>Project closeout call</strong>: After completing the last milestone, we'll schedule a final meeting to close out the project.</li>
    </ul>
    <Spacer/>
    <Callout/>
    <Spacer/>
  </Layout>
))
