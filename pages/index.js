import {
  Container,
  Header,
  Button,
  Card,
  Divider
} from 'semantic-ui-react'
import Link from 'next/link'
import Layout from '../components/layout'
import Page from '../components/page'
import Spacer from '../components/spacer'
import VisualizationCard from './index/visualizationCard'
import UserProfileCard from './index/userProfileCard'
import HugeLogo from '../components/hugeLogo'

const visualizations = [
  {
    title: 'Campaign Finance Institute',
    img: '/static/images/portfolio/cfi.JPG',
    description: 'An interactive visualization for a database of campaign finance law, spanning all US States and every other year since 1996.',
    links: [
      {
        icon: 'video play',
        href: 'https://cfinst.github.io/',
        title: 'Interactive Visualization'
      },
      {
        icon: 'github',
        href: 'https://github.com/cfinst/cfinst.github.io',
        title: 'Source Code'
      },
      {
        icon: 'youtube',
        href: 'https://www.youtube.com/watch?v=hWAV2kkY1xk',
        title: 'Video of Presentation'
      }
    ]
  },
  {
    title: 'Josquin Ribbon',
    img: '/static/images/portfolio/josquin.jpg',
    description: 'An interactive visualization of Renaissance music curated and digitized by the Josquin Research Project at Stanford University.',
    links: [
      {
        icon: 'video play',
        href: 'http://ribbon.humdrum.org/',
        title: 'Interactive Visualization'
      },
      {
        icon: 'github',
        href: 'https://github.com/sul-cidr/josquin-ribbon',
        title: 'Source Code'
      }
    ]
  }
]

const team = [
  {
    name: 'Curran',
    img: '/static/images/CurranBioPicSmall.jpg',
    description: 'Fascinated by visual presentation of data as a means to understand the world better and communicate that understanding to others.',
    links: [
      {
        icon: 'book',
        href: 'https://curran.github.io/portfolio/Resume.pdf',
        title: 'Resume'
      },
      {
        icon: 'github',
        href: 'https://github.com/curran',
        title: 'github.com/curran'
      },
      {
        icon: 'twitter',
        href: 'https://twitter.com/currankelleher',
        title: 'twitter.com/currankelleher'
      }
    ]
  },
  {
    name: 'Seemant',
    img: '/static/images/seemant.jpg',
    description: 'Part recovering engineer, part product-manager, part customer support expert, part data visualizer, and part organizer.',
    links: [
      {
        icon: 'book',
        href: 'http://www.seemantk.com/',
        title: 'seemantk.com'
      },
      {
        icon: 'github',
        href: 'https://github.com/seemantk',
        title: 'github.com/seemantk'
      },
      {
        icon: 'twitter',
        href: 'https://twitter.com/seemantk',
        title: 'twitter.com/seemantk'
      }
    ]
  }
]

export default Page(({ user }) => (
  <Layout title='Datavis.tech' user={user} hideNav>
    <Container text>
      <HugeLogo noLink/>
      <Container textAlign='center'>
        <Header as='h1'>Data Visualization Consulting Services</Header>
      </Container>

      <Spacer/>
      <Divider horizontal>
        Projects
      </Divider>

      <Card.Group>
        {
          visualizations.map((props, i) =>
            <VisualizationCard {...props} key={i}/>
          )
        }
      </Card.Group>

      <Container textAlign='center'>
        <Spacer/>
        <p>We can help you visualize your data.</p>
        <Link href='/consulting'>
          <Button>Hire us!</Button>
        </Link>
        <Spacer/>
      </Container>

      <Divider horizontal>
        Team
      </Divider>

      <Card.Group>
        {
          team.map((props, i) =>
            <UserProfileCard {...props} key={i}/>
          )
        }
      </Card.Group>
    </Container>
  </Layout>
))
