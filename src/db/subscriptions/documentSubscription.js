import {DB_DOCUMENTS_COLLECTION} from '../../constants'
import connection from '../connection'

export default () => {
  let cleanup

  return {
    init,
    tearDown
  }

  function init ({id}, {onUpdate, onError}) {
    const doc = connection.get(DB_DOCUMENTS_COLLECTION, id)
    doc.subscribe((err) => {

      if (err) {
        onError(err)
        return
      }

      onUpdate([doc])

      // doc passed in array in order to keep update subscription result shape consistent across all subscriptions
      const onUpdateListener = () => onUpdate([doc])
      doc.on('op', onUpdateListener)

      cleanup = () => {
        doc.destroy()
        doc.removeListener('op', onUpdateListener)
      }
    })
  }

  function tearDown () {
    if (cleanup) {
      cleanup()
    }
  }

}
