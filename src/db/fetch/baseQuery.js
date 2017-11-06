import connection from '../connection'

export default (collectionName, queryFactory) => {
  let query

  return {
    init,
    tearDown
  }

  function init (parameters, {onUpdate, onError}) {
    query = connection.createFetchQuery(collectionName, queryFactory(parameters))

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
