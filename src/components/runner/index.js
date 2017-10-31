import RunnerRenderer from './runnerRenderer'
import {DocumentSubscriptions} from '../../db/subscriptions'
import Subscription from '../subscription'
import Loading from '../loading'
import files from './files'

// TODO refactor this subscription logic to the page root level.
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
