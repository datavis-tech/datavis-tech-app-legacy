import connection from '../connection'

// Manages subscription to a single ShareDB document.
// If `template` is defined and the document does not yet exist,
// then a new document is created with fields from the `template` object.
export default ({id}, {collection, template}) => {
  let cleanup

  return {
    init,
    tearDown
  }

  function init ({onUpdate, onError, onPermissionDenied}) {

    const doc = connection.get(collection, id)
    doc.subscribe((err) => {

      if (err && err.message.match(/^403: Permission denied/)) {
        onPermissionDenied()
        return
      }

      if (err) {
        onError(err)
        return
      }

      if (template && doc.type === null) {
        doc.create(template)
      }

      onUpdate(doc)

      const onUpdateListener = () => onUpdate(doc)
      doc.on('op', onUpdateListener)

      const onErrorListener = error => onError(error.message)
      doc.on('error', onErrorListener)

      cleanup = () => {
        doc.destroy()
        doc.removeListener('op', onUpdateListener)
        doc.removeListener('error', onErrorListener)
      }
    })
  }

  function tearDown () {
    if (cleanup) {
      cleanup()
    }
  }

}
