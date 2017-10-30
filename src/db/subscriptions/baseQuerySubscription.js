import connection from '../connection'

export default class BaseQuerySubscription {

  constructor (collectionName, queryFactory) {
    this.__collectionName = collectionName
    this.__queryFactory = queryFactory
  }

  init (parameters, {onUpdate, onError}) {
    this.__query = connection.createSubscribeQuery(this.__collectionName, this.__queryFactory(parameters))

    const onUpdateListener = () => {
      onUpdate(this.__query.results)
    }

    this.__query.on('ready', onUpdateListener)
    this.__query.on('changed', onUpdateListener)
  }

  tearDown () {
    if (this.__query) {
      this.__query.destroy()
    }
  }

}
