import React from 'react'
import Page from '../components/page'
import Layout from '../components/layout'
import { Form, Button, Container } from 'semantic-ui-react'
import { Router } from '../routes'
import { createDocument } from '../modules/shareDBGateway'

class CreatePage extends React.Component {
  onSubmit (event) {
    event.preventDefault() // Prevent form submission

    // Create a new document in the ShareDB backend.
    const id = createDocument({
      title: this.titleInput.value,
      description: this.descriptionInput.value,
      owner: this.props.user.id
    })

    // Redirect to the edit page after creation.
    Router.pushRoute('edit', { id })
  }

  render () {
    return (
      <Layout title={'Create | Datavis.tech'} user={this.props.user}>
        <Container text>
          <h1>Create</h1>
          <Form onSubmit={this.onSubmit.bind(this)}>
            <Form.Field>
              <label>Title</label>
              <input
                placeholder='Enter your title here.'
                ref={(el) => { this.titleInput = el }}
              />
            </Form.Field>
            <Form.Field>
              <label>Description</label>
              <input
                placeholder='Enter your description here (optional).'
                ref={(el) => { this.descriptionInput = el }}
              />
            </Form.Field>
            <Button>Create</Button>
          </Form>
        </Container>
      </Layout>
    )
  }
}

export default Page(CreatePage)
