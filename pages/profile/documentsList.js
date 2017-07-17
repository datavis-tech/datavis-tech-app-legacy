import { List, Divider } from 'semantic-ui-react'
import { Link } from '../../routes'

// Use only the first line of the description
// as the tagline in the listing.
const truncate = (description) => description.split('\n')[0]

const DocumentPreview = ({id, data: { title, description, type }}) => {

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

const DocumentsList = ({ documents }) => {
  if (!documents) {
    return null
  }
  const dataDocuments = documents.filter(d => d.data.type === 'data')
  const visDocuments = documents.filter(d => d.data.type !== 'data')
  return (
    <div>
      { dataDocuments.length ? <Divider horizontal>Datasets</Divider> : null }
      <List divided relaxed>
        { dataDocuments.map(DocumentPreview) }
      </List>
      { visDocuments.length ? <Divider horizontal>Visualizations</Divider> : null }
      <List divided relaxed>
        { visDocuments.map(DocumentPreview) }
      </List>
    </div>
  )
}

export default DocumentsList
