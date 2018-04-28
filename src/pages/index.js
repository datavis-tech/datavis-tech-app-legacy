import React from 'react'
import { Container, Header } from 'semantic-ui-react'
import Page from '../components/page'
import Layout from '../components/layout'
import Spacer from '../components/spacer'
import HugeLogo from '../components/hugeLogo'
import DocumentsList from '../components/documentsList'

// TODO test
function Home ({ user, recentDocuments }) {
  return (
    <Layout title='Datavis.tech' user={user}>
      <Container text>
        <Spacer space='60px' />
        <HugeLogo noLink />
        <Spacer space='10px' />
        <Container textAlign='center'>
          <Header as='h1'>
                        A collaborative data visualization platform.
          </Header>
        </Container>
        <Spacer space='50px' />
        <p style={{ fontSize: '1.5em', textAlign: 'center' }}>
                    You can use this site to publish datasets and create
                    visualizations, collaborating with others in real time.
        </p>
        <Spacer space='50px' />
      </Container>
      <DocumentsList documents={recentDocuments} />
    </Layout>
  )
}

Home.getInitialProps = async ({ req }) => {

  let recentDocuments = []

  if (req) {
    require('isomorphic-fetch')
    /* global fetch:false */
    const response = await fetch(
      'http://localhost:3000/rest/documents/recent'
    )

    recentDocuments = await response.json()
  }

  return { recentDocuments }
}

export default Page(Home)
