import React from 'react'
import Page from '../components/page'
import Layout from '../components/layout'
import { Form, Button } from 'semantic-ui-react'

class CreatePage extends React.Component {
  render () {
    const { user } = this.props

    return (
      <Layout title={'Create | Datavis.tech'} user={user}>
        <h1>Create</h1>
        <Form>
          <Form.Field>
            <label>Title</label>
            <input placeholder='Enter your title here.' />
          </Form.Field>
          <Form.Field>
            <label>Description</label>
            <input placeholder='Enter your description here (optional).'/>
          </Form.Field>
          <Button type='submit'>Create</Button>
        </Form>
      </Layout>
    )
  }
}

export default Page(CreatePage)
