import { List } from 'semantic-ui-react'
import { Link } from '../../routes'

// Use only the first line of the description
// as the tagline in the listing.
const truncate = (description) => description.split('\n')[0]

const DocumentPreview = ({id, data: { title, description }}) => (
  <List.Item key={id} >
    <List.Content>
      <Link route='view' params={{ id }}>
        <a>
          <List.Header>{title}</List.Header>
          <List.Description>{truncate(description)}</List.Description>
        </a>
      </Link>
    </List.Content>
  </List.Item>
)

const DocumentsList = ({ documents }) => {
  if (!documents) {
    return null
  }
  return (
    <List divided relaxed>
      { documents.map(DocumentPreview) }
    </List>
  )
}

export default DocumentsList
