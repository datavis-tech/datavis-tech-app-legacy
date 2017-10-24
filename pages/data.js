import React from 'react'
import Page from '../components/page'
import {ViewPage, ViewPageLayout} from '../components/viewPage'
import DataViewer from '../components/dataViewer'

export default Page(
  ViewPage((props) => (
    <ViewPageLayout
      {...props}
      Content={DataViewer}
    />
  ))
)
