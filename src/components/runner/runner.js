import RunnerRenderer from './runnerRenderer'
import files from './files'

export default ({content, references, referenceDocuments}) => (
  <RunnerRenderer
    template={content}
    files={files(references, referenceDocuments)}
  />
)
