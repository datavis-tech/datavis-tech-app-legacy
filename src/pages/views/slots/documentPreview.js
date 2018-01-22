import { List, Image } from 'semantic-ui-react'
import { Link } from '../../../routes'

// Use only the first line of the description
// as the tagline in the listing.
// TODO strip out Markdown links
const truncate = (description) => description && description.split('\n')[0]

// Generates a Data URI for the base64 encoded thumbnail image.
const thumbnailSrcURI = thumbnail => `data:image/png;base64,${thumbnail}`

const thumbnailScale = 2 / 3
const thumbnailWidth = 230 * thumbnailScale
const thumbnailHeight = 120 * thumbnailScale

// The nesting of Image and Link here may seem odd,
// but this is required to get the right behavior of Next.js Routing
// and Semantic UI, with regard to links and styling.
const Thumbnail = ({thumbnail, type, id}) => (
  thumbnail
    ? (
      <Image>
        <Link route={type} params={{ id }}>
          <a>
            <Image src={thumbnailSrcURI(thumbnail)} width={thumbnailWidth} height={thumbnailHeight} />
          </a>
        </Link>
      </Image>
    )
    : null
)

// This component implements a preview for a document
// that shows its title and a truncated version of its description.
// Clicking on this preview will navigate to the view page for the document shown.
const DocumentPreview = ({ id, type, title, description, thumbnail }) => (
  <List.Item>
    <Thumbnail thumbnail={thumbnail} id={id} type={type} />
    <List.Content>
      <Link route={type} params={{ id }}>
        <a>
          <List.Header>{title}</List.Header>
          <List.Description>{truncate(description)}</List.Description>
        </a>
      </Link>
    </List.Content>
  </List.Item>
)

export default DocumentPreview
