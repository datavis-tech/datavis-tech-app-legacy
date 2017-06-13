import { Link } from '../routes'
import Page from '../components/page'
import Layout from '../components/layout'

export default Page(({ user }) => (
  <Layout title='Datavis.tech' user={user} />
))
