import React from 'react'
import PropTypes from 'prop-types'
import { Header, Grid, Button } from 'semantic-ui-react'
import { Link } from '../../routes'
import Layout from '../layout'
import AvatarLink from '../avatarLink'
import ViewPageDescription from './viewPageDescription'
import { title } from '../../db/accessors'

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
 * It has 3 slots -- Content, Description and References which allows to fill in with appropriate sections
 */
const ViewPageLayout = ({id, user, ownerProfile, doc, referenceDocs, ...slots}) => (
  <Layout title={(title(doc) || 'Loading...') + ' | Datavis.tech'} user={user}>
    <div>
      <Header as='h1'>{title(doc)}</Header>
      <slots.Content doc={doc} referenceDocs={referenceDocs} />
      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column width={12}>
            <slots.Description doc={doc} />
            <slots.References referenceDocs={referenceDocs} />
          </Grid.Column>
          <Grid.Column width={4}>
            <OwnerAvatarLink user={ownerProfile} />
            <Link route='edit' params={{ id }}>
              <a>
                <Button fluid>Edit</Button>
              </a>
            </Link>
            <Button style={{marginTop: '5px'}} fluid>Fork</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  </Layout>
)

ViewPageLayout.defaultProps = {
  Description: ViewPageDescription,
  References: () => null
}

ViewPageLayout.propTypes = {
  Content: PropTypes.func.isRequired
}

export default ViewPageLayout
