import { List } from 'semantic-ui-react'
import { Link } from '../routes'

// Use only the first line of the description
// as the tagline in the listing.
const truncate = (description) => description.split('\n')[0]

// This component implements a preview for a document
// that shows its title and a truncated version of its description.
// Clicking on this preview will navigate to the view page for the document shown.
const DocumentPreview = ({id, data: { title, description, type }}) => {

  // TODO create a separate accessor that implements this logic.
  // If type is undefined, treat it as 'vis'.
  const docType = type || 'vis'

  return (
    <List.Item key={id} >
      <List.Content>
        <Link route={docType} params={{ id }}>
          <a>
            <List.Header>{title}</List.Header>
            <List.Description>{truncate(description)}</List.Description>
          </a>
        </Link>
      </List.Content>
    </List.Item>
  )
}

export default DocumentPreview
