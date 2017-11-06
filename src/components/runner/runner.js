// TODO merge it to component from index.js after edit page refactoring (after it would be moved to subscriptions)

import RunnerRenderer from './runnerRenderer'
import files from './files'
import {references, content} from '../../db/accessors'

export default ({doc, referenceDocs}) => (
  <RunnerRenderer
    template={content(doc)}
    files={files(references(doc), referenceDocs)}
  />
)
