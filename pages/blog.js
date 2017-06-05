import React from 'react'
import GlobalClientStore from '../modules/globalClientStore'

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
    
    const user = process.browser ? GlobalClientStore.user : req.user

    return {
      post,
      user
    }
  }

  constructor (props) {
    super(props)

    // TODO move this to a wrapper used by all pages.
    if (process.browser) {
      GlobalClientStore.user = props.user
      GlobalClientStore.user.clientLoaded = true // TODO delete
    }
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
