import { Grid } from 'semantic-ui-react'
import ProfileCard from './profileCard'
import DocumentsList from './documentsList'
import Loading from '../../components/loading'

const ProfileBody = ({ loading, profile, documents, documentsLoading }) => {
  if (loading) {
    return <Loading />
  }
  if (!profile) {
    return (
      <div>User not found</div>
    )
  }
  return (
    <Grid>
      <Grid.Column width={5}>
        <ProfileCard profile={profile} />
      </Grid.Column>
      <Grid.Column width={11}>
        <DocumentsList documents={documents} documentsLoading={documentsLoading}/>
      </Grid.Column>
    </Grid>
  )
}

export default ProfileBody
