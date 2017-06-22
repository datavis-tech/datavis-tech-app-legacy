import React from 'react'
import {
  Form,
  Grid,
  Button,
  Container,
  Modal,
  Header,
  Icon
} from 'semantic-ui-react'
import { Link } from '../../routes'
import StringBinding from 'sharedb-string-binding'
import Page from '../../components/page'
import Layout from '../../components/layout'
import { subscribeToDocument } from '../../modules/shareDBGateway'

class DeleteConfirmModal extends React.Component {
  constructor (props) {
    super(props)

    this.state = { show: false }

    this.open = (event) => {
      event.preventDefault() // Prevent form submission.
      this.setState({ show: true })
    }

    this.close = () => {
      this.setState({ show: false })
    }
  }

  render () {
    return (
      <div>
        <Button negative onClick={this.open}>Delete</Button>
        <Modal open={this.state.show} onClose={this.close} basic size='small'>
          <Header icon='archive' content='Are you sure?' />
          <Modal.Content>
            <p>Are you sure you want to delete this document? This cannot be undone.</p>
          </Modal.Content>
          <Modal.Actions>
            <Button basic inverted onClick={this.close}>
              <Icon name='remove' /> No
            </Button>
            <Button color='red' inverted>
              <Icon name='checkmark' /> Yes
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

class EditPage extends React.Component {
  static async getInitialProps ({ query }) {
    return { id: query.id }
  }

  constructor (props) {
    super(props)
    this.state = {
      docInitialized: false
    }
  }

  componentDidMount () {
    if (process.browser) {
      subscribeToDocument(this.props.id, (err, doc) => {
        if (err) throw err

        new StringBinding(this.titleInput, doc, ['title']).setup()
        new StringBinding(this.descriptionInput, doc, ['description']).setup()
        new StringBinding(this.contentInput, doc, ['content']).setup()

        const updateState = () => {
          this.setState({
            docInitialized: true,
            title: doc.data.title
          })
        }
        updateState()
        doc.on('op', updateState)
        this.cleanupDoc = () => {
          doc.destroy()
          doc.removeListener('op', updateState)
        }
      })
    }
  }

  componentWillUnmount () {
    if(this.cleanupDoc){
      this.cleanupDoc()
    }
  }

  render () {
    const { id, user } = this.props
    const { title } = this.state

    return (
      <Layout title={(title || 'Loading...') + ' (editing) | Datavis.tech'} user={user}>
        <Container text>
          <Form>
            <Form.Field>
              <label>Title</label>
              <Grid columns={2} divided>
                <Grid.Row>
                  <Grid.Column width={12}>
                    <input
                      placeholder={this.state.docInitialized ? '' : 'Loading...'}
                      ref={(el) => { this.titleInput = el }}
                    />
                  </Grid.Column>
                  <Grid.Column width={4}>
                    <Link route='view' params={{ id }}>
                      <a>
                        <Button fluid>View</Button>
                      </a>
                    </Link>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Form.Field>
            <Form.Field>
              <label>Description</label>
              <textarea
                placeholder={this.state.docInitialized ? '' : 'Loading...'}
                ref={(el) => { this.descriptionInput = el }}
              />
            </Form.Field>
            <Form.Field>
              <label>Content</label>
              <textarea
                placeholder={this.state.docInitialized ? '' : 'Loading...'}
                ref={(el) => { this.contentInput = el }}
              />
            </Form.Field>
            <Form.Field>
              <DeleteConfirmModal/>
            </Form.Field>
          </Form>
        </Container>
      </Layout>
    )
  }
}

export default Page(EditPage)
