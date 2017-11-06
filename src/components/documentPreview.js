import {List} from 'semantic-ui-react'
import {Link} from '../routes'
import {id, type, title, description} from '../db/accessors'

// Use only the first line of the description
// as the tagline in the listing.
// TODO strip out Markdown links
const truncate = (description) => description && description.split('\n')[0]

// This component implements a preview for a document
// that shows its title and a truncated version of its description.
// Clicking on this preview will navigate to the view page for the document shown.
const DocumentPreview = ({doc}) => (
  <List.Item>
    <List.Content>
      <Link route={type(doc)} params={{ id: id(doc) }}>
        <a>
          <List.Header>{title(doc)}</List.Header>
          <List.Description>{truncate(description(doc))}</List.Description>
        </a>
      </Link>
    </List.Content>
  </List.Item>
)

export default DocumentPreview
