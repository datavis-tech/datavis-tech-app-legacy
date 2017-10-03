import React from 'react'
import { Link } from '../routes'
import marked from 'marked'
import { Header, Grid, Button } from 'semantic-ui-react'
import Layout from '../components/layout'
import AvatarLink from '../components/avatarLink'
import createProfileQuery from '../modules/db/createProfileQuery'
import subscribeToDocument from '../modules/db/subscribeToDocument'
import Loading from './loading'

// A wrapper around AvatarLink that adds some spacing and the text "By".
const OwnerAvatarLink = ({ user }) => {
  if (user) {
    return (
      <div style={{ marginBottom: '0.3em' }}>
        <span style={{marginRight: '4px'}}>By</span>
        <AvatarLink user={user} />
      </div>
    )
  }
  return null
}

// This component factory provides the bulk of functionality
// for so-called "view pages", which appear under
// `/vis/:id` and `/data/:id`
// The thing that differs between the pages at these routes
// is the  way that the content is presented, which is
// implemented by the ContentViewComponent, which is
// defined differently for each route.
const ViewPage = (ContentViewComponent) => {
  class ViewPageComponent extends React.Component {
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
        return <Loading />
      }

      const descriptionHTML = {
        __html: marked(description)
      }

      return (
        <div>
          <Header as='h1'>{title}</Header>
          <ContentViewComponent doc={this.doc} />
          <Grid columns={2} divided>
            <Grid.Row>
              <Grid.Column width={12}>
                <div dangerouslySetInnerHTML={descriptionHTML} />
              </Grid.Column>
              <Grid.Column width={4}>
                <OwnerAvatarLink user={ownerProfile} />
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
  return ViewPageComponent
}

export default ViewPage
