import {
  Header,
  Image,
  Icon,
  List
} from 'semantic-ui-react'

import { Router } from '../../routes'

const DocumentPreview = ({id, data: { title, description }}) => (
  <List.Item
    key={id}
    onClick={() => Router.pushRoute('view', { id })}
  >
    <List.Content>
      <List.Header as='a'>{title}</List.Header>
      <List.Description as='a'>{description}</List.Description>
    </List.Content>
  </List.Item>
)

const DocumentsList = ({ documents }) => {
  if(!documents){
    return null
  }
  return (
    <List divided relaxed>
      { documents.map(DocumentPreview) }
    </List>
  )
}

export default DocumentsList
