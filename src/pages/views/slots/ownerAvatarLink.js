import React from 'react'
import AvatarLink from '../../../components/avatarLink'

// A wrapper around AvatarLink that adds some spacing and the text "By".
export default ({ user }) => (
  <div style={{ marginBottom: '0.3em', fontSize: '0.8em' }}>
    <span style={{marginRight: '3px'}}>By</span>
    <AvatarLink user={user} />
  </div>
)
