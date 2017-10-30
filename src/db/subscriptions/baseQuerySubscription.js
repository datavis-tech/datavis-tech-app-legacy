import connection from '../connection'

export default (collectionName, queryFactory) => {
  let query

  return {
    init (parameters, {onUpdate, onError}) {
      query = connection.createSubscribeQuery(collectionName, queryFactory(parameters))

      const onUpdateListener = () => {
        onUpdate(query.results)
      }

      query.on('ready', onUpdateListener)
      query.on('changed', onUpdateListener)
    },
    tearDown () {
      if (query) {
        query.destroy()
      }
    }
  }
}
