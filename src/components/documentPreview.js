import { Image, Card } from 'semantic-ui-react'
import { VIS_DOC_TYPE } from '../constants'
import truncateDescription from './truncateDescription'
import { Link } from '../routes'

// Generates a Data URI for the base64 encoded thumbnail image.
const thumbnailSrcURI = thumbnail => `data:image/png;base64,${thumbnail}`

// Match thumbnail width for visualizations.
// Use horizontal space for data and tech.
const cardStyle = type => ({ width: type === VIS_DOC_TYPE ? '230px' : '100%' })

const Thumbnail = ({thumbnail}) => (
  thumbnail ? <Image src={thumbnailSrcURI(thumbnail)} /> : null
)

// This component implements a preview for a document
// that shows its title and a truncated version of its description.
// Clicking on this preview will navigate to the view page for the document shown.
const DocumentPreview = ({document}) => {
  const { id, type, title, description, thumbnail, viewCount } = document
  return (
    <Link route={type} params={{ id }}>
      <a className='ui card' style={cardStyle(type)} >
        <Thumbnail thumbnail={thumbnail} />
        <Card.Content>
          <Card.Header>{title}</Card.Header>
          <Card.Meta>{viewCount} views</Card.Meta>
          <Card.Description>{truncateDescription(description)}</Card.Description>
        </Card.Content>
      </a>
    </Link>
  )
}

export default DocumentPreview
