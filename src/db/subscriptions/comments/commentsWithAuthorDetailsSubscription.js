import values from 'lodash/values'
import CommentsSubscriptions from './commentsSubscriptions'
import subscribeOnCommentsIds from './subscribeCommentsIds'
import fetchAuthors from './fetchAuthors'

// TODO test
export default ({ relatedDocument }) => {

  const subscription = CommentsSubscriptions()

  return {
    init,
    tearDown
  }

  function init (subscriber) {
    subscription.init({ onUpdate })
    subscribeOnCommentsIds({ relatedDocument }, { onUpdate: onCommentsIdsUpdate})

    function onCommentsIdsUpdate (ids) {

      console.log('comments ids', ids)

      if (ids.length) {
        subscription.add(ids)
      } else {
        onUpdate({})
      }
    }

    function onUpdate (commentsMap) {
        onCommentsUpdate(subscriber.onUpdate, commentsMap)
    }

  }

  function tearDown () {
    if (subscription) {
      subscription.tearDown()
    }
  }

  async function onCommentsUpdate (_onUpdate, commentsMap) {
    const comments = values(commentsMap)
    const authors = await fetchAuthors({ ids: comments.map(c => c.data.author) }) || []

    console.log('authors', authors)

    _onUpdate({ comments, authors })
  }

}
