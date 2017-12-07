import { Header, Segment } from 'semantic-ui-react'
import Page from '../components/page'
import Layout from '../components/layout'
import Spacer from '../components/spacer'
import HugeLogo from '../components/hugeLogo'

export default Page(({ user }) => (
  <Layout title='About Datavis.tech' user={user} >
    <Header as='h1'>About Datavis.tech</Header>
    <p> Datavis Tech INC was founded by Curran Kelleher in January 2016. For the first year, the corporation was a vehicle for data visualization consulting projects and freelance work. Since its inception, the idea of a platform for collaborative data visualization was brewing. The datavis.tech platform was prototyped many times throughout 2016 and 2017, and launched in its most basic form in June 2017.</p>
  
    <p>At the moment, here's what you can do with Datavis.tech:</p>

    <ul>
      <li>Create datasets</li>
      <li>Create visualizations</li>
      <li>Collaborate with others in real-time on visualizations</li>
      <li>Update visualizations automatically when data changes</li>
      <li>Fork and modify existing visualizations</li>
      <li>See all visualizations for a given dataset</li>
      <li>See the data behind any visualization</li>
    </ul>

    <p>We are continually adding new features to the platform in a long-term effort to build the premiere platform for creating, hosting, and leveraging the full potential of interactive data visualizations on the Web. The platform is heavily inspired by <a href="https://bl.ocks.org">bl.ocks.org</a> and <a href="https://blockbuilder.org">Blockbuilder</a>, which have blossomed as tools for creating and hosting visualization examples. We want to go beyond what those services provide in terms of supporting collaboration and wide dissemination of interactive data visualizations. When data visualizations are first-class citizens of the Web, there are many many opportunities to better serve visualization creators and visualization consumers.</p>
  
    <p>Here are some examples of people who could leverage datavis.tech:</p>

    <ul>
      <li>Anyone who wants to create, develop, and share data visualizations.</li>
      <li>Journalists looking to augment their news story with more visual and fact-based content.</li>
      <li>Educators who want to present information better to their students.</li>
      <li>Researchers who deal with data and want to explore and present it visually.</li>
      <li>Companies who want to do rapid prototyping of visual data presentation.</li>
    </ul>

  </Layout>
))
