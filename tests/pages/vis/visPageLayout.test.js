import React from 'react'
import {shallow} from 'enzyme'

import ViewPageLayout from '../../../src/components/viewPage/viewPageLayout'
import Runner from '../../../src/components/runner/runner'
import DocumentPreviewList from '../../../src/components/documentPreviewList'

import VisPageLayout from '../../../src/pages/vis/visPageLayout'

describe('vis page layout', () => {

  let sut
  let props

  beforeEach(() => {
    props = {
      id: Symbol('id'),
      doc: Symbol('doc'),
      user: Symbol('user'),
      profile: Symbol('profile'),
      referenceDocs: Symbol('referenceDocs')
    }
    sut = shallow(<VisPageLayout {...props} />)

  })

  it('should render view page layout', () => {
    expect(sut.find(ViewPageLayout).props()).toMatchObject({
      id: props.id,
      user: props.user,
      doc: props.doc,
      ownerProfile: props.profile,
      referenceDocs: props.referenceDocs,
      Content: Runner
    })
  })

  it('should render view page layout with references', () => {
    const ReferencesProp = sut.find(ViewPageLayout).prop('References')
    const References = shallow(<ReferencesProp referenceDocs={props.referenceDocs} />)
    expect(References.find(DocumentPreviewList).props()).toMatchObject({
      title: 'Data',
      documents: props.referenceDocs
    })
  })

})
