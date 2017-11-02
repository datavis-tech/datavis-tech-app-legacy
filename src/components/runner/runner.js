// TODO merge it to component from index.js after edit page refactoring (after it would be moved to subscriptions)

import RunnerRenderer from './runnerRenderer'
import files from './files'

// TODO split this into a common module, use it everywhere.
// This accessor returns the references for the given document,
// or an empty array if there are no references.
const references = doc => doc.data.references || []

// TODO refactor this subscription logic to the page root level.
export default ({doc, referenceDocs}) => (
  <RunnerRenderer
    template={doc.data.content}
    files={files(references(doc), referenceDocs)}
  />
)
