import { Header, Container } from 'semantic-ui-react'
import Page from '../components/page'
import Layout from '../components/layout'

// const visualizations = [
//  {
//    title: 'Campaign Finance Institute',
//    img: '/static/images/portfolio/cfi.JPG',
//    description: 'An interactive visualization for a database of campaign finance law, spanning all US States and every other year since 1996.',
//    links: [
//      {
//        icon: 'video play',
//        href: 'https://cfinst.github.io/',
//        title: 'Interactive Visualization'
//      },
//      {
//        icon: 'github',
//        href: 'https://github.com/cfinst/cfinst.github.io',
//        title: 'Source Code'
//      },
//      {
//        icon: 'youtube',
//        href: 'https://www.youtube.com/watch?v=hWAV2kkY1xk',
//        title: 'Video of Presentation'
//      }
//    ]
//  },
//  {
//    title: 'Josquin Ribbon',
//    img: '/static/images/portfolio/josquin.jpg',
//    description: 'An interactive visualization of Renaissance music curated and digitized by the Josquin Research Project at Stanford University.',
//    links: [
//      {
//        icon: 'video play',
//        href: 'http://ribbon.humdrum.org/',
//        title: 'Interactive Visualization'
//      },
//      {
//        icon: 'github',
//        href: 'https://github.com/sul-cidr/josquin-ribbon',
//        title: 'Source Code'
//      }
//    ]
//  }
// ]

// const team = [
//   {
//     name: 'Curran',
//     img: '/static/images/CurranBioPicSmall.jpg',
//     description: 'Fascinated by visual presentation of data as a means to understand the world better and communicate that understanding to others.',
//     links: [
//       {
//         icon: 'book',
//         href: 'https://curran.github.io/portfolio/Resume.pdf',
//         title: 'Resume'
//       },
//       {
//         icon: 'github',
//         href: 'https://github.com/curran',
//         title: 'github.com/curran'
//       },
//       {
//         icon: 'twitter',
//         href: 'https://twitter.com/currankelleher',
//         title: 'twitter.com/currankelleher'
//       }
//     ]
//   },
//   {
//     name: 'Seemant',
//     img: '/static/images/seemant.jpg',
//     description: 'Part recovering engineer, part product-manager, part customer support expert, part data visualizer, and part organizer.',
//     links: [
//       {
//         icon: 'book',
//         href: 'http://www.seemantk.com/',
//         title: 'seemantk.com'
//       },
//       {
//         icon: 'github',
//         href: 'https://github.com/seemantk',
//         title: 'github.com/seemantk'
//       },
//       {
//         icon: 'twitter',
//         href: 'https://twitter.com/seemantk',
//         title: 'twitter.com/seemantk'
//       }
//     ]
//   }
// ]

//      <Divider horizontal>
//        Team
//      </Divider>
//      <Card.Group>
//        {
//          team.map((props, i) =>
//            <UserProfileCard {...props} key={i}/>
//          )
//        }
//      </Card.Group>
//
//      <Spacer />
//
//      <Container textAlign='center'>
//        <Spacer />
//        <p>We can help you visualize your data.</p>
//        <Link href='/consulting'>
//          <Button>Hire us!</Button>
//        </Link>
//        <Spacer />
//      </Container>
//
// <Divider horizontal>
//   Projects
// </Divider>

// <Card.Group>
//   {
//     visualizations.map((props, i) =>
//       <VisualizationCard {...props} key={i} />
//     )
//   }
// </Card.Group>

export default Page(({ user }) => (
  <Layout title='About Datavis.tech' user={user} >
    <Container text>
      <Header>About us</Header>

      <p>Datavis Tech Inc. provides services and products relating to data visualization design, implementation, and training. Founded by Curran Kelleher in January 2016, the corporation was initially a vehicle for data visualization consulting projects and freelance work. Since its inception, the idea of a platform for collaborative data visualization was brewing. The datavis.tech platform was prototyped many times throughout 2016 and 2017, and launched in its most basic form in June 2017. Our small fully remote team is continually improving and adding new features to the platform, designing and building for longevity.</p>

      <Header>Our Product</Header>

      <p>Our software product is a collaborative data visualization platform that you can use to create and share data and visualizations, collaborating with others in real time. Heavily influenced by <a href="https://bl.ocks.org/">Bl.ocks.org</a> and <a href="http://blockbuilder.org/">Blockbuilder</a>, Datavis.tech aims to provide a collaborative social layer for data visualization. The ultimate product vision is that of a social hub for data visualization where anyone can create, share, discuss and iterate data and visualizations.</p>

      <p>Here's what you can do now with datavis.tech:</p>

      <ul>
        <li>Upload, describe, publish and share public datasets.</li>
        <li>Create visualizations of published datasets using HTML and JavaScript.</li>
        <li>Fork and modify existing visualizations.</li>
        <li>Navigate the relationships between data, visualizations, and forks.</li>
        <li>See a listing of visualizations for a given dataset.</li>
        <li>See the data behind any visualization.</li>
        <li>Add and remove collaborators to your visualizations.</li>
        <li>Collaborate with others on visualizations via real-time synchronous editing.</li>
        <li>Embed a visualization inside any Web page.</li>
        <li>Update visualizations automatically when data changes</li>
      </ul>

      <p>Here are some examples of people who could leverage datavis.tech:</p>

      <ul>
        <li>Anyone who wants to create, develop, and share data visualizations.</li>
        <li>Journalists looking to augment their news story with more visual and fact-based content.</li>
        <li>Educators who want to present information better to their students.</li>
        <li>Researchers who deal with data and want to explore and present it visually.</li>
        <li>Companies who want to do rapid prototyping of visual data presentation.</li>
      </ul>

      {
        // <Header>Features In the Pipeline</Header>
        // <ul>
        //   <li>Free for public content, paid subscription plan for private content.</li>
        //   <li>Thumbnails throughout the app.</li>
        //   <li>On-premise installation plans for enterprises.</li>
        //   <li>Automatic data updating.</li>
        //   <li>Integration with external data sources such as SQL databases.</li>
        //   <li>Marketplace for buying and selling access to data, visualizations, and components.</li>
        //   <li>Option to purchase prints (postcards, small prints, posters) of data visualizations and reports.</li>
        //   <li>Paid access to live data analysis events, pairing visualization experts with domain experts.</li>
        // </ul>
      }

      <Header>Consulting Services</Header>
      
      <p>We offer consulting services for design and development of interactive data visualizations. We specialize in creative, collaborative projects in which your data is visualized using D3.js and other Open Source technologies. Given a data set or API to work with, and an understanding of the tasks you'd like visualization to facilitate, we can work with you to explore and present your data visually. Our ideal engagement length is 4 months, grounded in weekly meetings.</p>

      <p>Through our consulting services we can help you with the following:</p>

      <ul>
        <li>Design and development of interactive data visualizations.</li>
        <li>Rapid visualization prototyping.</li>
        <li>Strategizing on data access and preprocessing for visualizations.</li>
        <li>Creating visualizations for embedding into existing software or Web pages.</li>
        <li>Exploratory data analysis using visualization.</li>
      </ul>

      <Header>Training</Header>

      <p>We offer training in data visualization theory and practice.</p> 
      <ul>
        <li>Custom tailored short-courses (1 week, remote) on data visualization for organizations.</li>
        <li>On-site training including lectures and interactive workshops.</li>
        <li>One-on-one mentorship on visualization design and D3.js programming.</li>
      </ul>

      <p>If you're interested in working with us, please reach out to curran@datavis.tech.</p>

    </Container>
  </Layout>
))
