import { TECH_DOC_TYPE } from '../../../constants'

import CodeMirror from '../../../components/codeMirror'
import DataViewer from '../../../components/dataViewer'

export default ({ document }) => (
  document.type === TECH_DOC_TYPE
    ? <CodeMirror value={document.content} />
    : <DataViewer content={document.content} />
)
