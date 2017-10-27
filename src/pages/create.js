import React from 'react'
import Page from '../components/page'
import Layout from '../components/layout'
import LoginButton from '../components/loginButton'
import { Form, Button, Container } from 'semantic-ui-react'
import { Router } from '../routes'
import createDocument from '../db/createDocument'

class CreatePage extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      creating: false
    }
  }

  onSubmit (event) {
    event.preventDefault() // Prevent form submission

    // Create a new document in the ShareDB backend.
    const id = createDocument({
      title: this.titleInput.value,
      description: this.descriptionInput.value,
      owner: this.props.user.id
    })

    // Set the creating flag to provide visual feedback
    // that something is happening.
    this.setState({
      creating: true
    })

    // Redirect to the edit page after creation.
    Router.pushRoute('edit', { id })
  }

  renderBody () {
    const { creating } = this.state
    if (this.props.user) {
      return (
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
          <Button disabled={creating} loading={creating}>Create</Button>
        </Form>
      )
    }
    return (
      <p>You must first <LoginButton /> to create.</p>
    )
  }

  render () {
    return (
      <Layout title={'Create | Datavis.tech'} user={this.props.user}>
        <Container text>
          <h1>Create</h1>
          { this.renderBody() }
        </Container>
      </Layout>
    )
  }
}

export default Page(CreatePage)
