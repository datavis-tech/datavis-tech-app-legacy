import DocumentSubscription from './documentSubscription'
import ProfileSubscription from './profileSubscription'
import ReferencesSubscription from './documentSubscriptions'
import {referenceIds, allReferencesLoaded} from '../accessors'

export default () => {

  let documentSubscription = DocumentSubscription()
  let profileSubscription = ProfileSubscription()
  let referencesSubscription = ReferencesSubscription()

  return {
    init,
    tearDown
  }

  // ToDo use onError
  function init ({id}, {onUpdate, onError}) {

    documentSubscription.init({id}, {
      onUpdate (doc) {

        let profile
        let referenceDocs

        profileSubscription.init({id: doc.data.owner}, {
          onUpdate (receivedProfile) {
            profile = receivedProfile
            notifyAboutUpdates(doc, profile, referenceDocs, onUpdate)
          }
        })

        referencesSubscription.init({ids: referenceIds(doc)}, {
          onUpdate (receivedReferenceDocs) {
            referenceDocs = receivedReferenceDocs
            notifyAboutUpdates(doc, profile, referenceDocs, onUpdate)
          }
        })

      },
      onError
    })
  }

  function tearDown () {
    documentSubscription.tearDown()
    profileSubscription.tearDown()
    referencesSubscription.tearDown()
  }

  function notifyAboutUpdates (doc, profile, referenceDocs, onUpdate) {
    if (doc && profile && allReferencesLoaded(doc, referenceDocs)) {
      onUpdate({doc, profile, referenceDocs})
    }
  }

}
