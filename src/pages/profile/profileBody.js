import { Grid } from 'semantic-ui-react'
import ProfileCard from './profileCard'
import DocumentsList from './documentsList'
import Loader from '../../components/loader'

const ProfileBody = (props) => {
  const {
    profileLoading,
    profile,
    documents,
    documentsLoading
  } = props

  return (
    <Loader ready={!profileLoading}>
      {
        profile
          ? (
            <Grid>
              <Grid.Column width={4}>
                <ProfileCard profile={profile} />
              </Grid.Column>
              <Grid.Column width={12}>
                <DocumentsList documents={documents} documentsLoading={documentsLoading} />
              </Grid.Column>
            </Grid>
          )
          : <div>User not found</div>
      }
    </Loader>
  )
}

export default ProfileBody
