import React from 'react'
import Page from '../components/page'
import Layout from '../components/layout'
import { Container } from 'semantic-ui-react'

class FeedbackThanksPage extends React.Component {
  render () {
    return (
      <Layout title={'Feedback | Datavis.tech'} user={this.props.user} hideFeedback>
        <Container text>
          <h1>Thanks!</h1>
          <p>Thank you for leaving feedback with us.</p>
        </Container>
      </Layout>
    )
  }
}

export default Page(FeedbackThanksPage)
