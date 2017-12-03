import React from 'react'
import Header from './header'
import Description from './description'
import OwnerAvatarLink from './ownerAvatarLink'
import DocumentPreviewList from './documentPreviewList'
import EditButton from './editButton'
import ForkButton from './forkButton'

export default ({id, ownerProfile, doc, forkedFrom, onFork}, overrideSlots = {}) => {
  const slots = {
    Header: <Header doc={doc} />,
    Description: <Description doc={doc} />,
    ForkedFrom: forkedFrom ? <DocumentPreviewList title='Forked from' documents={[forkedFrom]} /> : null,
    Avatar: <OwnerAvatarLink user={ownerProfile} />,
    EditButton: <EditButton id={id} />,
    ForkButton: <ForkButton onFork={onFork} />
  }

  return {...slots, ...overrideSlots}
}
