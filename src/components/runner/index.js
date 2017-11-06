import RunnerRenderer from './runnerRenderer'
import {DocumentSubscriptions} from '../../db/subscriptions'
import {references, referenceIds, allReferencesLoaded} from '../../db/accessors'
import Subscription from '../subscription'
import Loading from '../loading'
import files from './files'

// TODO refactor this subscription logic to the page root level.
export default ({doc}) => (
  <Subscription
    subscription={DocumentSubscriptions()}
    parameters={{ids: referenceIds(doc)}}
  >
    { ({docs: referenceDocs}) => (
      allReferencesLoaded(doc, referenceDocs)
        ? (
          <RunnerRenderer
            template={doc.data.content}
            files={files(references(doc), referenceDocs)}
          />
        )
        : <Loading />
    )}
  </Subscription>
)
