import RunnerRenderer from './runnerRenderer'
import {DocumentSubscriptions} from '../../db/subscriptions'
import Subscription from '../subscription'
import Loading from '../loading'
import files from './files'

// TODO split this into a common module, use it everywhere.
// This accessor returns the references for the given document,
// or an empty array if there are no references.
const references = doc => doc.data.references || []

// TODO split this into a common module, use it everywhere.
const referenceIds = doc => references(doc).map(reference => reference.id)

// This function returns true if all references have been loaded.
const allReferencesLoaded = (doc, referenceDocs) => {

  // If there are no references, return true.
  if (referenceIds(doc).length === 0) {
    return true
  }

  // If there are references, return true if there are any elements,
  // because DocumentSubscriptions only passes documents after all are loaded.
  return referenceDocs.length > 0
}

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
