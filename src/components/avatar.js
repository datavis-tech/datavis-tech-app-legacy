import { Image } from 'semantic-ui-react'
import { avatarURL } from '../db/accessors'

export default ({ user }) => (
  <Image
    height={36}
    // This can be used for testing a full square avatar image
    // src='https://avatars2.githubusercontent.com/u/156229?v=4&size=72'
    src={avatarURL(user, 72)}
    style={{marginRight: '0px'}} // This fixes the dropdown in loginControl.
    inline
    circular
    bordered
  />
)
