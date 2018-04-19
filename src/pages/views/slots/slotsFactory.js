import React from 'react'
import DocumentPreviewList from '../../../components/documentPreviewList'
import Header from './header'
import Description from './description'
import OwnerAvatarLink from './ownerAvatarLink'
import EditButton from './editButton'
import ForkButton from './forkButton'
import EmbedButton from './embedButton'
import ExportButton from './exportButton'
import ViewCount from './viewCount'
import FullscreenButton from './fullscreenButton'

export default ({id, ownerProfile, document, forkedFrom, onFork}, overrideSlots = {}) => {
  const slots = {
    Header: <Header title={document.title} />,
    Description: <Description description={document.description} />,
    ForkedFrom: forkedFrom ? <DocumentPreviewList title='Forked from' documents={[forkedFrom]} /> : null,
    ViewCount: <ViewCount viewCount={document.viewCount} />,
    Avatar: <OwnerAvatarLink user={ownerProfile} />,
    EditButton: <EditButton id={id} />,
    ForkButton: <ForkButton onFork={onFork} />,
    EmbedButton: <EmbedButton id={id} />,
    ExportButton: <ExportButton id={id} />,
    FullscreenButton: <FullscreenButton id={id} />
  }

  return {...slots, ...overrideSlots}
}
