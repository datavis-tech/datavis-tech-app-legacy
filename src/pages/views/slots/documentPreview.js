import { List } from 'semantic-ui-react'
import { Link } from '../../../routes'

// Use only the first line of the description
// as the tagline in the listing.
// TODO strip out Markdown links
const truncate = (description) => description && description.split('\n')[0]

const backgroundStyle = (thumbnail) => ({
  backgroundImage: `url(data:image/png;base64,${thumbnail})`,
  backgroundPosition: '50% 0%',
  display: 'inline-block',
  width: '230px',
  height: '120px',
  textShadow: '1px 1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, -1px -1px 0 #fff'
})

// This component implements a preview for a document
// that shows its title and a truncated version of its description.
// Clicking on this preview will navigate to the view page for the document shown.
const DocumentPreview = ({ id, type, title, description, thumbnail }) => (
  <List.Item>
    <List.Content>
      <Link route={type} params={{ id }}>
        <a style={backgroundStyle(thumbnail)}>
          <List.Header>{title}</List.Header>
          <List.Description>{truncate(description)}</List.Description>
        </a>
      </Link>
    </List.Content>
  </List.Item>
)

export default DocumentPreview
