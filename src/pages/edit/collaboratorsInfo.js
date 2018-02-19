import { Icon, Popup } from 'semantic-ui-react'
import { typeWords } from '../../words/typeWords'

export const CollaboratorsInfo = ({type}) => (
  <Popup trigger={<Icon name='info circle' />}>
    <Popup.Header>About Collaborators</Popup.Header>
    <Popup.Content>
      <p>Collaborators added here will have access to edit this {typeWords[type]}. Multiple collaborators can edit text or code simultaneously. Changes will be visible immediately by all collaborators, and also by anyone viewing.</p>
      <p>Collaborators have the same powers as the owner, including:</p>
      <ul>
        <li>Editing content</li>
        <li>Adding and removing collaborators</li>
        <li>Deleting the {typeWords[type]}</li>
      </ul>
    </Popup.Content>
  </Popup>
)
