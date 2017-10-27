import React from 'react'
import PropTypes from 'prop-types'
import {Header, Grid, Button} from 'semantic-ui-react'
import { Link } from '../../routes'
import Layout from '../layout'
import AvatarLink from '../avatarLink'
import ViewPageDescription from './viewPageDescription'

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

/**
 * Component which represents layout for components of View Page family.
 * It has two slots -- Content and Description which allows to fill in with appropriate sections
 */
const ViewPageLayout = ({id, user, ownerProfile, doc, Content, Description}) => (
  <Layout title={(doc.data.title || 'Loading...') + ' | Datavis.tech'} user={user}>
    <div>
      <Header as='h1'>{doc.data.title}</Header>
      <Content doc={doc} />
      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column width={12}>
            <Description doc={doc} />
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
  </Layout>
)

ViewPageLayout.defaultProps = {
  Description: ViewPageDescription
}

ViewPageLayout.propTypes = {
  Content: PropTypes.func.isRequired
}

export default ViewPageLayout
