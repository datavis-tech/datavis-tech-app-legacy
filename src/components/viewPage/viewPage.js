import React from 'react'
import createProfileQuery from '../../db/createProfileQuery'
import subscribeToDocument from '../../db/subscribeToDocument'
import Loading from '../loading'

// TODO: extract Loader into new Higher Order Component to make it re-usable ?
// TODO: extract subscription logic to service and inject it here ?

/**
 * This component is a generalization of the ViewPage components family.
 * It contains common logic for such pages, like subscription to the document.
 * Also it has common visualization logic: if doc is not ready show loader else
 * show page content
 */
const ViewPage = (Content) => {
  class ViewPageComponent extends React.Component {
    static async getInitialProps ({query}) {
      return {id: query.id}
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
          this.doc = doc

          const updateDocState = () => {
            this.setState({
              docInitialized: true
            })
          }

          updateDocState()

          // TODO only invoke updateDocState if changes affect title or description.
          doc.on('op', updateDocState)

          this.cleanupDoc = () => {
            doc.destroy()
            doc.removeListener('op', updateDocState)
          }

          // Fetch the profile data for the document owner, so it can be shown.
          this.ownerQuery = createProfileQuery({id: doc.data.owner}, (ownerProfile) => {
            this.setState({ownerProfile})
          })
        })
      }
    }

    componentWillUnmount () {
      if (this.cleanupDoc) {
        this.cleanupDoc()
      }
      if (this.ownerQuery) {
        this.ownerQuery.destroy()
      }
    }

    render () {
      const {id, user} = this.props
      const {docInitialized, ownerProfile} = this.state

      return docInitialized
        ? <Content id={id} user={user} ownerProfile={ownerProfile} doc={this.doc} />
        : <Loading />
    }
  }
  return ViewPageComponent
}

export default ViewPage
