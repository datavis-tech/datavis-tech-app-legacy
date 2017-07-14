import React from 'react'
import { Link } from '../routes'
import marked from 'marked'
import { Header, Grid, Button } from 'semantic-ui-react'
import { createProfileQuery, subscribeToDocument } from '../modules/shareDBGateway'
import Page from '../components/page'
import Layout from '../components/layout'
import Runner from '../components/runner'
import AvatarLink from '../components/avatarLink'

class ViewPage extends React.Component {
  static async getInitialProps ({ query }) {
    return { id: query.id }
  }

  constructor (props) {
    super(props)
    this.state = {
      docInitialized: false
    }
    if (process.browser) {
      subscribeToDocument(this.props.id, (err, doc) => {
        if (err) throw err

        this.doc = doc

        const updateDocState = () => {
          this.setState({
            docInitialized: true,
            title: doc.data.title,
            description: doc.data.description
          })
        }

        updateDocState()

        // TODO only invoke updateDocState if changes affect title or description.
        doc.on('op', updateDocState)

        this.cleanupDoc = () => {
          doc.destroy()
          doc.removeListener('op', updateDocState)
        }

        // Fetch the profile data for the document owner, so it can be shown.
        this.ownerQuery = createProfileQuery({ id: doc.data.owner }, (ownerProfile) => {
          this.setState({ ownerProfile })
        })
      })
    }
  }

  componentWillUnmount () {
    if (this.cleanupDoc) {
      this.cleanupDoc()
    }
    if (this.ownerQuery) {
      this.ownerQuery.destroy()
    }
  }

  renderBody () {
    const { id } = this.props

    const {
      docInitialized,
      title,
      description,
      ownerProfile
    } = this.state

    if (!docInitialized) {
      return <div>Loading...</div>
    }

    const descriptionHTML = {
      __html: marked(description)
    }

    return (
      <div>
        <Header as='h1'>{title}</Header>
        <Runner doc={this.doc} />
        <Grid columns={2} divided>
          <Grid.Row>
            <Grid.Column width={12}>
              <div dangerouslySetInnerHTML={descriptionHTML} />
            </Grid.Column>
            <Grid.Column width={4}>
              <AvatarLink user={ownerProfile} />
              <Link route='edit' params={{ id }}>
                <a>
                  <Button fluid>Edit</Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }

  render () {
    const { user } = this.props
    const { title } = this.state
    return (
      <Layout title={(title || 'Loading...') + ' | Datavis.tech'} user={user}>
        { this.renderBody() }
      </Layout>
    )
  }
}

export default Page(ViewPage)
