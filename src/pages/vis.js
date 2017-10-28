import React from 'react'
import Page from '../components/page'
import {ViewPage, ViewPageLayout} from '../components/viewPage'
import Runner from '../components/runner'

export default Page(
  <ViewPage>
    { ({id, user, ownerProfile, doc}) => (
      <ViewPageLayout
        id={id}
        user={user}
        ownerProfile={ownerProfile}
        doc={doc}
        Content={Runner}
      />
    )}
  </ViewPage>
)
