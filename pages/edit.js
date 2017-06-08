import React from 'react'
import Page from '../components/page'
import Layout from '../components/layout'
import { Form } from 'semantic-ui-react'

class EditPage extends React.Component {
  static async getInitialProps ({ query }) {
    return { id: query.id }
  }

  render () {
    const { id, user } = this.props

    return (
      <Layout title={id + ' | Datavis.tech'} user={user}>
        <Form>
          <Form.Field>
            <label>Title</label>
            <input ref={(el) => { this.titleInput = el }} />
          </Form.Field>
          <Form.Field>
            <label>Description</label>
            <input ref={(el) => { this.descriptionInput = el }} />
          </Form.Field>
        </Form>
      </Layout>
    )
  }
}

export default Page(EditPage)
