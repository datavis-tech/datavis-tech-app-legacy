import React from 'react'
import {
  Form,
  Grid,
  Button,
  Container,
  Table,
  Input
} from 'semantic-ui-react'
import { Link, Router } from '../../routes'
import StringBinding from 'sharedb-string-binding'
import Page from '../../components/page'
import Layout from '../../components/layout'
import { subscribeToDocument } from '../../modules/shareDBGateway'
import DeleteConfirmModal from './deleteConfirmModal'

class EditPage extends React.Component {
  static async getInitialProps ({ query }) {
    return { id: query.id }
  }

  constructor (props) {
    super(props)
    this.state = {
      docInitialized: false,
      deleting: false
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

        // Store a reference to the document so it can be deleted.
        this.doc = doc
      })
    }
  }

  // This gets called after the user clicks through the delete confirm modal.
  deleteDocument () {
    if (this.doc) {
      this.setState({
        deleting: true
      })
      this.doc.del((err) => {
        if (err) {
          return console.error(err)
        }
        console.log(this.props.user.username)
        Router.pushRoute('profile', {
          username: this.props.user.username
        })
      })
    } else {
      console.error('Attempted delete before document was initialized. This should never happen.')
    }
  }

  componentWillUnmount () {
    if (this.cleanupDoc) {
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
              <label>References</label>
            </Form.Field>
            <Form.Field inline>
              {
                (function (){
                  return (
                    <Table celled>
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell>File name</Table.HeaderCell>
                          <Table.HeaderCell>Document ID</Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>

                      <Table.Body>
                        <Table.Row>
                          <Table.Cell>
                            <Input transparent fluid placeholder='File name...' value='iris.csv' />
                          </Table.Cell>
                          <Table.Cell>
                            <Input transparent fluid placeholder='Document ID...' value='92f2f3a74cb84acc9f8527317d2f39f7'/>
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>
                            <Input transparent fluid placeholder='File name...' />
                          </Table.Cell>
                          <Table.Cell>
                            <Input transparent fluid placeholder='Document ID...' />
                          </Table.Cell>
                        </Table.Row>
                      </Table.Body>
                    </Table>
                  )
                }())
              }
            </Form.Field>
            <Form.Field>
              <DeleteConfirmModal
                deleteDocument={this.deleteDocument.bind(this)}
                deleting={this.state.deleting}
              />
            </Form.Field>
          </Form>
        </Container>
      </Layout>
    )
  }
}

export default Page(EditPage)
