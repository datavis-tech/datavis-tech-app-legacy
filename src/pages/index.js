import React from 'react'
import { Observer } from 'mobx-react'
import { Container, Header } from 'semantic-ui-react'
import Page from '../components/page'
import Layout from '../components/layout'
import Spacer from '../components/spacer'
import HugeLogo from '../components/hugeLogo'
import DocumentsList from '../components/documentsList'

// TODO test
class Home extends React.Component {
  static async getInitialProps ({ req }) {
    // if it is called on the server, we need pollyfil fetch first
    if (req) {
      require('isomorphic-fetch')
    }

    /* global fetch:false */
    const response = await fetch(
      'http://localhost:3000/rest/documents/recent'
    )
    const recentDocuments = (await response.json()) || []

    return { recentDocuments }
  }

  componentDidMount () {
    const { store, recentDocuments } = this.props
    store.addRecent(recentDocuments)
  }

  render () {

    const { user, store } = this.props

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
        <Observer>
          {() => <DocumentsList documents={store.recent} />}
        </Observer>
      </Layout>
    )
  }
}

export default Page(Home)
