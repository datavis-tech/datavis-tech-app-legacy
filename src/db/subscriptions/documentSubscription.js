import {DB_DOCUMENTS_COLLECTION} from '../../constants'
import connection from '../connection'

export default class DocumentSubscription {

  init ({id}, {onUpdate, onError}) {

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

      this.__cleanup = () => {
        doc.destroy()
        doc.removeListener('op', onUpdateListener)
      }

    })
  }

  tearDown () {
    if (this.__cleanup) {
      this.__cleanup()
    }
  }

}
