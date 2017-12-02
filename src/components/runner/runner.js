import RunnerRenderer from './runnerRenderer'
import files from './files'
import {references, content} from '../../db/accessors'

export default ({doc, referenceDocs}) => (
  <RunnerRenderer
    template={content(doc)}
    files={files(references(doc), referenceDocs)}
  />
)
