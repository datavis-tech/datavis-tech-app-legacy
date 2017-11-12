import DocumentSubscription from './documentSubscription'
import ProfileSubscription from './profileSubscription'
import ReferencesSubscription from './documentSubscriptions'
import {referenceIds, allReferencesLoaded} from '../accessors'

export default ({id}) => {

  let documentSubscription = DocumentSubscription({id})
  let profileSubscription
  let referencesSubscription

  return {
    init,
    tearDown
  }

  // ToDo use onError
  function init ({onUpdate, onError}) {

    documentSubscription.init({
      onUpdate (doc) {

        profileSubscription = ProfileSubscription({id: doc.data.owner})
        referencesSubscription = ReferencesSubscription({ids: referenceIds(doc)})

        let profile
        let referenceDocs

        profileSubscription.init({
          onUpdate (receivedProfile) {
            profile = receivedProfile
            notifyAboutUpdates(doc, profile, referenceDocs, onUpdate)
          }
        })

        referencesSubscription.init({
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
