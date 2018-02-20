import React from 'react'
import Page from '../components/page'
import Layout from '../components/layout'
import LoginButton from '../components/loginButton'
import { Form, Button, Container } from 'semantic-ui-react'
import { Router } from '../routes'
import { id } from '../db/accessors'
import { createDocument } from '../db/actions'
import { typeWords } from '../words/typeWords'
import { typeDescriptions } from '../words/typeDescriptions'

class CreatePage extends React.Component {

  static async getInitialProps ({query}) {
    return {
      type: query.type
    }
  }

  constructor (props) {
    super(props)
    this.state = {
      creating: false
    }
  }

  onSubmit (event) {
    event.preventDefault() // Prevent form submission

    // Create a new document in the ShareDB backend.
    const doc = createDocument({
      title: this.titleInput.value,
      owner: this.props.user.id,
      type: this.props.type
    })

    // Set the creating flag to provide visual feedback
    // that something is happening.
    this.setState({
      creating: true
    })

    // Redirect to the edit page after creation.
    Router.pushRoute('edit', { id: id(doc) })
  }

  renderBody () {
    const { creating } = this.state
    if (this.props.user) {
      return (
        <Form onSubmit={this.onSubmit.bind(this)}>
          <Form.Field>
            <label>Title</label>
            <input
              data-test='title-input'
              ref={(el) => { this.titleInput = el }}
            />
          </Form.Field>
          <Button primary disabled={creating} loading={creating}>Create</Button>
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
          <h1 data-test='create-heading'>
            Create a {typeWords[this.props.type]}
          </h1>
          { typeDescriptions[this.props.type] }
          { this.renderBody() }
        </Container>
      </Layout>
    )
  }
}

export default Page(CreatePage)
