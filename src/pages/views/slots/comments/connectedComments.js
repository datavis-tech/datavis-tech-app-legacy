import React from 'react'
import CommentsSubscription from '../../../../db/subscriptions/comments/commentsWithAuthorDetailsSubscription'
import { createComment } from '../../../../db/actions/createComment'
import Subscription from '../../../../components/subscription'
import Loader from '../../../../components/loader'
import Comments from './comments'
import serializeComments from './serializeComments'

export default ({ author, relatedDocument }) => {
  const onCommentAdd = text => createComment({ author, relatedDocument, text })

  return (
    <Subscription subscription={CommentsSubscription({ relatedDocument })} >
      {
        ({data, isReady}) => (
          <Loader ready={isReady}>
            <Comments comments={serializeComments(data)} onCommentAdd={onCommentAdd} />
          </Loader>
        )
      }
    </Subscription>
  )
}
