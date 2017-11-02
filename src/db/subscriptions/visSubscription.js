import DocumentSubscription from './documentSubscription'
import ProfileSubscription from './profileSubscription'
import ReferencesSubscription from './documentSubscriptions'

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
        let references

        profileSubscription.init({id: doc.data.owner}, {
          onUpdate (receivedProfile) {
            profile = receivedProfile
            notifyAboutUpdates(doc, profile, references, onUpdate)
          }
        })

        referencesSubscription.init({ids: doc.data.references.map(({id}) => id)}, {
          onUpdate (receivedReferences) {
            references = receivedReferences
            notifyAboutUpdates(doc, profile, references, onUpdate)
          }
        })

      }
    })
  }

  function tearDown () {
    documentSubscription.tearDown()
    profileSubscription.tearDown()
    referencesSubscription.tearDown()
  }

  function notifyAboutUpdates (doc, profile, references, onUpdate) {
    if (doc && profile && references) {
      onUpdate({doc, profile, references})
    }
  }

}
