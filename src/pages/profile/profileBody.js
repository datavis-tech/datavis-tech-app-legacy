import { Grid } from 'semantic-ui-react'
import ProfileCard from './profileCard'
import DocumentsList from './documentsList'
import Loading from '../../components/loading'

const ProfileBody = (props) => {
  const {
    profileLoading,
    profile,
    documents,
    documentsLoading
  } = props

  if (profileLoading) {
    return <Loading />
  }
  if (!profile) {
    return (
      <div>User not found</div>
    )
  }
  return (
    <Grid>
      <Grid.Column width={4}>
        <ProfileCard profile={profile} />
      </Grid.Column>
      <Grid.Column width={12}>
        <DocumentsList documents={documents} documentsLoading={documentsLoading} />
      </Grid.Column>
    </Grid>
  )
}

export default ProfileBody