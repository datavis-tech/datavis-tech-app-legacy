import RunnerRenderer from './runnerRenderer'
import {DocumentSubscriptions} from '../../db/subscriptions'
import Subscription from '../subscription'
import Loading from '../loading'

// Constructs the "files" object expected by MagicSandbox.js,
// using the file names from `references`, and content from `docs`.
const files = (references, docs) => {
  const filesObject = {}
  references.forEach(({ fileName }, i) => {
    filesObject[fileName] = {
      content: docs[i].data.content
    }
  })
  return filesObject
}

export default ({doc}) => (
  <Subscription
    subscription={DocumentSubscriptions()}
    parameters={{
      ids: doc.data.references.map(reference => reference.id)
    }}
  >
    { ({docs}) => (
      docs.length > 0
        ? (
          <RunnerRenderer
            template={doc.data.content}
            files={files(doc.data.references, docs)}
          />
        )
        : <Loading />
    )}
  </Subscription>
)
