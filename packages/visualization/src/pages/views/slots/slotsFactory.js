import React from 'react'
import Header from './header'
import Description from './description'
import OwnerAvatarLink from './ownerAvatarLink'
import DocumentPreviewList from './documentPreviewList'
import EditButton from './editButton'
import ForkButton from './forkButton'
import EmbedButton from './embedButton'

export default ({id, ownerProfile, document, forkedFrom, onFork}, overrideSlots = {}) => {
  const slots = {
    Header: <Header title={document.title} />,
    Description: <Description description={document.description} />,
    ForkedFrom: forkedFrom ? <DocumentPreviewList title='Forked from' documents={[forkedFrom]} /> : null,
    Avatar: <OwnerAvatarLink user={ownerProfile} />,
    EditButton: <EditButton id={id} />,
    ForkButton: <ForkButton onFork={onFork} />,
    EmbedButton: <EmbedButton id={id} />
  }

  return {...slots, ...overrideSlots}
}
