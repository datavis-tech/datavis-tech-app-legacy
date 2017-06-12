import { List } from 'semantic-ui-react'
import { Link } from '../../routes'

const DocumentPreview = ({id, data: { title, description }}) => (
  <List.Item key={id} >
    <List.Content>
      <Link route='view' params={{ id }}>
        <a>
          <List.Header as='a'>{title}</List.Header>
          <List.Description>{description}</List.Description>
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
