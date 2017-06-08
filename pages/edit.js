import React from 'react'
import { Form } from 'semantic-ui-react'
import StringBinding from 'sharedb-string-binding'
import Page from '../components/page'
import Layout from '../components/layout'
import connection from '../modules/shareDBConnection'
import { DB_DOCUMENTS_COLLECTION } from '../modules/constants'

class EditPage extends React.Component {
  static async getInitialProps ({ query }) {
    return { id: query.id }
  }

  constructor (props) {
    super(props)
    this.state = {
      docInitialized: false
    }
    if (process.browser) {
      this.doc = connection.get(DB_DOCUMENTS_COLLECTION, props.id)
    }
  }

  componentDidMount () {
    if (process.browser) {
      // TODO cleanup on unmount
      
      this.doc.subscribe((err) => {
        if (err) throw err;

        const doc = this.doc

        new StringBinding(this.titleInput, doc, ['title']).setup()
        new StringBinding(this.descriptionInput, doc, ['description']).setup()

        const updateState = () => {
          this.setState({
            docInitialized: true,
            title: doc.data.title,
          })
        }
        updateState()
        doc.on('op', updateState)
      })
    }
  }

  render () {
    const { user } = this.props
    const { title } = this.state

    return (
      <Layout title={(title || 'Loading...') +  ' (editing) | Datavis.tech'} user={user}>
        <Form>
          <Form.Field>
            <label>Title</label>
            <input
              placeholder={this.state.docInitialized ? '' : 'Loading...'}
              ref={(el) => { this.titleInput = el }}
            />
          </Form.Field>
          <Form.Field>
            <label>Description</label>
            <input
              placeholder={ this.state.docInitialized ? '' : 'Loading...' }
              ref={(el) => { this.descriptionInput = el }}
            />
          </Form.Field>
        </Form>
      </Layout>
    )
  }
}

export default Page(EditPage)
