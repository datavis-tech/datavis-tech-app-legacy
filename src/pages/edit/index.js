import React from 'react'
import { Router } from '../../routes'
import { title } from '../../db/accessors.js'
import Page from '../../components/page'
import Layout from '../../components/layout'
import Subscription from '../../components/subscription'
import Loader from '../../components/loader'
import VisSubscription from '../../db/subscriptions/visSubscription'
import ErrorMessage from './errorMessage'
import EditPageForm from './editPageForm'

class EditPage extends React.Component {
  static async getInitialProps ({query}) {
    return {
      id: query.id
    }
  }

  // This gets called after the user clicks through the delete confirm modal.
  deleteDocument (doc) {
    if (doc) {
      // TODO refactor this into an action under src/db/actions
      doc.del((err) => {
        if (err) {
          return console.error(err)
        }

        Router.pushRoute('profile', {
          username: this.props.user.username
        })
      })
    } else {
      console.error('Attempted delete before document was initialized. This should never happen.')
    }
  }

  render () {

    const {id, user} = this.props

    return (
      <Subscription subscription={VisSubscription({id})}>
        {
          ({data, isReady, error}) => {
            const {
              doc,
              // TODO refactor subscription to optionally omit profile - not necessary here!
              referenceDocs
            } = data || {} // data might be null

            return (
              <Loader ready={isReady}>
                <Layout
                  title={(title(doc) || 'Loading...') + ' (editing) | Datavis.tech'}
                  user={user}
                  includeCSS='/static/codemirror/codemirror.min.css'
                >
                  <EditPageForm
                    doc={doc}
                    referenceDocs={referenceDocs}
                    deleteDocument={() => this.deleteDocument(doc)}
                  />
                  <ErrorMessage error={error} />
                </Layout>
              </Loader>
            )
          }
        }
      </Subscription>
    )
  }
}

export default Page(EditPage)
