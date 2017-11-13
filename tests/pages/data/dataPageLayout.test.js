import React from 'react'
import {shallow} from 'enzyme'

import ViewPageLayout from '../../../src/components/viewPage/viewPageLayout'
import DataViewer from '../../../src/components/dataViewer'
import DocumentPreviewList from '../../../src/components/documentPreviewList'

import DataPageLayout from '../../../src/pages/data/dataPageLayout'

describe('data page layout', () => {

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
    sut = shallow(<DataPageLayout {...props} />)

  })

  it('should render view page layout', () => {
    expect(sut.find(ViewPageLayout).props()).toMatchObject({
      id: props.id,
      user: props.user,
      doc: props.doc,
      ownerProfile: props.profile,
      referenceDocs: props.referenceDocs,
      Content: DataViewer
    })
  })

  it('should render view page layout with references', () => {
    const ReferencesProp = sut.find(ViewPageLayout).prop('References')
    const References = shallow(<ReferencesProp referenceDocs={props.referenceDocs} />)
    expect(References.find(DocumentPreviewList).props()).toMatchObject({
      title: 'Visualizations',
      documents: props.referenceDocs
    })
  })

})
