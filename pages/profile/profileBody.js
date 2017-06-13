import { Grid } from 'semantic-ui-react'
import ProfileCard from './profileCard'
import DocumentsList from './documentsList'

const ProfileBody = ({ loading, profile, documents }) => {
  if (loading) {
    return null
  }
  if (!profile) {
    return (
      <div>User not found</div>
    )
  }
  return (
    <Grid>
      <Grid.Column width={6}>
        <ProfileCard profile={profile}/>
      </Grid.Column>
      <Grid.Column width={10}>
        <DocumentsList documents={documents}/>
      </Grid.Column>
    </Grid>
  )
}

export default ProfileBody