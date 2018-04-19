import React from 'react'
import { DATA_DOC_TYPE, TECH_DOC_TYPE } from '../../../constants'
import DocumentPreviewList from '../../../components/documentPreviewList'

export default function References ({documents}) {
  return (
    <React.Fragment>
      <DocumentPreviewList
        title='Data'
        documents={documents.filter(({type}) => type === DATA_DOC_TYPE)}
      />
      <DocumentPreviewList
        title='Tech'
        documents={documents.filter(({type}) => type === TECH_DOC_TYPE)}
      />
    </React.Fragment>
  )
}
