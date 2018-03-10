import React from 'react'
import { Comment, Form, TextArea, Button } from 'semantic-ui-react'
import CommentWithAuthor from './comment'

export default ({ comments, onCommentAdd }) => {

  let reply

  return (
    <Comment.Group>
      {
        comments.map(comment => <CommentWithAuthor key={comment.id} comment={comment} />)
      }
      <Form reply>
        <TextArea onChange={({target: {value}}) => reply = value} />
        <Button content='Add Reply' labelPosition='left' icon='edit' primary onClick={() => onCommentAdd(reply)} />
      </Form>
    </Comment.Group>
  )
}
