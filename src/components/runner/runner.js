import RunnerRenderer from './runnerRenderer'
import { allReferencesLoaded, files } from '../../db/accessors'
import Loader from '../loader'

// Renders the running visualization if all references are defined.
// Shows a loading spinner while references are loading.
export default ({content, references, referenceDocuments}) => (
  allReferencesLoaded(references, referenceDocuments)
    ? (
      <RunnerRenderer
        template={content}
        files={files(references, referenceDocuments)}
      />
    )
    : <Loader /> // Using ready and children doesn't work out in this case.
)
