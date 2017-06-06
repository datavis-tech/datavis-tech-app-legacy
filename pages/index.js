import { Link } from '../routes'
import Page from '../components/page'
import Layout from '../components/layout'

export default Page(() => (
  <Layout title='Datavis.tech'>
    <ul>
      <li><Link route='view' params={{ id: 'hello-world' }}><a>Blog: Hello world</a></Link></li>
      <li><Link route='view' params={{ id: 'another-blog-post' }}><a>Blog: Another blog post</a></Link></li>
      <li><Link route='view' params={{ id: 'non-existant' }}><a>Blog: Not found</a></Link></li>
    </ul>
  </Layout>
))
