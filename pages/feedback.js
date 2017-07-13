import React from 'react'
import Page from '../components/page'
import Layout from '../components/layout'
import { Form, Button, Container } from 'semantic-ui-react'
import { Router } from '../routes'
import { createFeedbackEntry } from '../modules/shareDBGateway'

class FeedbackPage extends React.Component {
  onSubmit (event) {
    event.preventDefault() // Prevent form submission
    const id = createFeedbackEntry({
      feedback: this.feedbackInput.value,
      user: this.props.user
    })
    Router.pushRoute('/feedback-thanks')
  }

  render () {
    return (
      <Layout title={'Feedback | Datavis.tech'} user={this.props.user} hideFeedback>
        <Container text>
          <h1>Leave Feedback</h1>
          <p>We warmly welcome your feedback on this site. Please do let us know your thoughts and suggestions on how we could improve your experience using this site.</p>
          <Form onSubmit={this.onSubmit.bind(this)}>
            <Form.Field>
              <textarea
                placeholder='I wish I could... How do I... Have you considered...'
                ref={(el) => { this.feedbackInput = el }}
              />
            </Form.Field>
            <Button primary>Submit</Button>
          </Form>
        </Container>
      </Layout>
    )
  }
}

export default Page(FeedbackPage)
