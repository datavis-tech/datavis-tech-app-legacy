import connection from '../connection'

// TODO: add usage of onError
export default (q, collectionName) => {
  let query

  return {
    init,
    tearDown
  }

  function init ({onUpdate, onError}) {
    query = connection.createSubscribeQuery(collectionName, q)

    const onUpdateListener = () => {
      onUpdate(query.results)
    }

    query.on('ready', onUpdateListener)
    query.on('changed', onUpdateListener)
  }

  function tearDown () {
    if (query) {
      query.destroy()
    }
  }

}
