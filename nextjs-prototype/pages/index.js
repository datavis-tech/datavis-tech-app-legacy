import {
  Container,
  Header,
  Input,
  Button,
  Checkbox,
  Form,
  Menu,
  Card,
  Image,
  Divider,
} from 'semantic-ui-react'
import Link from 'next/link'
import { PublicPage } from 'next-github-auth'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import VisualizationCard from '../components/visualizationCard'
import UserProfileCard from '../components/userProfileCard'
import Spacer from '../components/spacer'

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

export default PublicPage(() => (
  <Layout>
    <Container textAlign='center'>
      <Image src='/static/images/Logo_Largest.png'/>
      <Header as='h1'>Data Visualization Consulting Services</Header>
    </Container>

    <Spacer/>
    <Divider horizontal>
      Recent Projects
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
      Associates
    </Divider>

    <Card.Group>
      {
        team.map((props, i) =>
          <UserProfileCard {...props} key={i}/>
        )
      }
    </Card.Group>

    <Container textAlign='center'>
      <Spacer/>
      <p>We are actively recruiting associates.</p>
      <Link href='/associates'>
        <Button>Join our team!</Button>
      </Link>
      <Spacer/>
      <Divider horizontal>
        Product
      </Divider>
      <Header as='h1'>We're building a product!</Header>
      <p>A platform for collaborative data visualization is in the works.</p>
      <a href='https://docs.google.com/forms/d/e/1FAIpQLSdO1wEo1Kj2ETfQMEhXGW6GIqtGFsfZ5UBwTnR-0QNvOYCEAw/viewform?usp=sf_link'>
        <Button>Sign up to be notified when we launch!</Button>
      </a>
      <Spacer/>
    </Container>
  </Layout>
))
