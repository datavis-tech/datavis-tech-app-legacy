import connection from '../connection'

// Manages subscription to a single ShareDB document.
export default ({id}, {collection}) => {
  let cleanup

  return {
    init,
    tearDown
  }

  function init ({onUpdate, onError}) {

    const doc = connection.get(collection, id)
    doc.subscribe((err) => {

      if (err) {
        onError(err)
        return
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
