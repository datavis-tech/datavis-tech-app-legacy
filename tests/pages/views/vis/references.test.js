import React from 'react'
import { shallow } from 'enzyme'

import { DATA_DOC_TYPE, TECH_DOC_TYPE } from '../../../../src/constants'

jest.mock('../../../../src/pages/views/slots')
import { DocumentPreviewList } from '../../../../src/pages/views/slots'
import References from '../../../../src/pages/views/vis/references'

describe('references', () => {

  let sut
  let props

  beforeEach(() => {

    props = {
      documents: [
        {type: DATA_DOC_TYPE},
        {type: TECH_DOC_TYPE}
      ]
    }

    sut = shallow(<References {...props} />)

  })

  it('should render 2 document preview lists', () => {
    expect(sut.find(DocumentPreviewList)).toHaveLength(2)
  })

  it('should render data documents preview', () => {
    expect(sut.childAt(0).props()).toMatchObject({
      title: 'Data',
      documents: [props.documents[0]]
    })
  })

  it('should render tech documents preview', () => {
    expect(sut.childAt(1).props()).toMatchObject({
      title: 'Tech',
      documents: [props.documents[1]]
    })
  })

})
