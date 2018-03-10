import React from 'react'
import { Button, Comment, Form, Header } from 'semantic-ui-react'

export default ({ comment }) => (
  <Comment>
    <Comment.Avatar src={comment.avatarUrl} />
    <Comment.Content>
      <Comment.Author as='a'>{comment.displayName}</Comment.Author>
      <Comment.Metadata>
        <div>Today at 5:42PM</div>
      </Comment.Metadata>
      <Comment.Text>{comment.text}</Comment.Text>
    </Comment.Content>
  </Comment>
)
