import React from 'react'

const posts = [
  { slug: 'hello-world', title: 'Hello world' },
  { slug: 'another-blog-post', title: 'Another blog post' }
]

export default class extends React.Component {
  static async getInitialProps ({ query, res, req }) {
    const post = posts.find(post => post.slug === query.slug)

    if (!post && res) {
      res.statusCode = 404
    }

    console.log(req)
    console.log('ereh')

    return {
      post,
      userJSON: JSON.stringify(req.user, null, 2)
    }
  }

  render () {
    const { post, userJSON } = this.props

    if (!post) return <h1>Post not found</h1>

    return (
      <div>
        <h1>{post.title}</h1>
        <pre>{userJSON}</pre>
      </div>
    )
  }
}
