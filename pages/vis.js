import React from 'react'
import Page from '../components/page'
import {ViewPage, ViewPageLayout} from '../components/viewPage'
import Runner from '../components/runner'

export default Page(
  ViewPage((props) => (
    <ViewPageLayout
      {...props}
      Content={Runner}
    />
  ))
)
