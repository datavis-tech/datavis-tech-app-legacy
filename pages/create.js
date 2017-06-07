import React from 'react'
import Page from '../components/page'
import Layout from '../components/layout'
import { Form, Button } from 'semantic-ui-react'
import createDocument from '../modules/createDocument'

const onButtonClick = (event) => {
  event.preventDefault() // Prevent form submission
  createDocument()
}

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
          <Button onClick={onButtonClick} >Create</Button>
        </Form>
      </Layout>
    )
  }
}

export default Page(CreatePage)
