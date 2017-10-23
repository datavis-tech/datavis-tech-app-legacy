import {partition} from 'lodash'
import {List, Divider} from 'semantic-ui-react'
import Loading from '../../components/loading'
import DocumentPreview from '../../components/documentPreview'

const DocumentsList = ({ documents, documentsLoading }) => {
  if (documentsLoading) {
    return <Loading />
  }
  if (!documents) {
    return null
  }

  const [dataDocuments, visDocuments] = partition(documents, d => d.data.type === 'data')

  // TODO: extract to new component
  return (
    <div>
      { dataDocuments.length ? <Divider horizontal>Datasets</Divider> : null }
      <List divided relaxed>
        { dataDocuments.map(d => <DocumentPreview key={d.id} {...d} />) }
      </List>

      { visDocuments.length ? <Divider horizontal>Visualizations</Divider> : null }
      <List divided relaxed>
        { visDocuments.map(d => <DocumentPreview key={d.id} {...d} />) }
      </List>
    </div>
  )
}

export default DocumentsList
