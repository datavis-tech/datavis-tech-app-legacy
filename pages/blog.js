import React from 'react'
import Page from '../modules/page'

const posts = [
  { slug: 'hello-world', title: 'Hello world' },
  { slug: 'another-blog-post', title: 'Another blog post' }
]

class BlogPage extends React.Component {
  static async getInitialProps ({ query, res, req }) {
    const post = posts.find(post => post.slug === query.slug)

    if (!post && res) {
      res.statusCode = 404
    }

    return { post }
  }

  render () {
    const { post, user } = this.props

    const userJSON = JSON.stringify(user, null, 2)

    if (!post) return <h1>Post not found</h1>

    return (
      <div>
        <h1>{post.title}</h1>
        <pre>{userJSON}</pre>
      </div>
    )
  }
}

export default Page(BlogPage)
