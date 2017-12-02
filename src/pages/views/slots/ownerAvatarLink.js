import React from 'react'
import AvatarLink from '../../../components/avatarLink'

// A wrapper around AvatarLink that adds some spacing and the text "By".
export default ({ user }) => (
  <div style={{ marginBottom: '0.3em' }}>
    <span style={{marginRight: '4px'}}>By</span>
    <AvatarLink user={user} />
  </div>
)
