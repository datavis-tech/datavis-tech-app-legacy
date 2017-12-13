import React from 'react'
import Subscription from '../../components/subscription'
import ProfileQuerySubscription from '../../db/subscriptions/profileQuerySubscription'
import ReferencesSubscription from '../../db/subscriptions/documentSubscriptions'
import { referenceIds, collaboratorIds } from '../../db/accessors'
import { removeCollaborator } from '../../db/actions/removeCollaborator'
import { addCollaborator } from '../../db/actions/addCollaborator'
import EditPageForm from './components/editPageForm'
import Collaborators from './collaborators'
import AddCollaboratorModal from './addCollaboratorModal'

// TODO add tests after onCollaboratorSubmit refactoring
export default class EditPageContent extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      showAddCollaboratorModal: false,
      loadingCollaboratorProfile: false,
      profileNotFound: false
    }

    this.showAddCollaboratorModal = this.showAddCollaboratorModal.bind(this)
    this.closeAddCollaboratorModal = this.closeAddCollaboratorModal.bind(this)
    this.onCollaboratorRemove = this.onCollaboratorRemove.bind(this)
    this.onCollaboratorSubmit = this.onCollaboratorSubmit.bind(this)
  }

  render () {

    const {doc, onDocumentDelete} = this.props

    return (
      <React.Fragment>
        <Subscription subscription={ReferencesSubscription({ids: referenceIds(doc)})}>
          {
            ({data: referenceDocs}) => (
              <EditPageForm
                doc={doc}
                referenceDocs={referenceDocs || []}
                onDocumentDelete={onDocumentDelete}
                Collaborators={
                  <Collaborators
                    ids={collaboratorIds(doc)}
                    onCollaboratorAdd={this.showAddCollaboratorModal}
                    onCollaboratorRemove={this.onCollaboratorRemove}
                  />
                }
              />
            )
          }
        </Subscription>
        <AddCollaboratorModal
          show={this.state.showAddCollaboratorModal}
          loading={this.state.loadingCollaboratorProfile}
          notFound={this.state.profileNotFound}
          onClose={this.closeAddCollaboratorModal}
          onCollaboratorSubmit={this.onCollaboratorSubmit}
        />
      </React.Fragment>
    )
  }

  showAddCollaboratorModal () {
    this.setState({showAddCollaboratorModal: true})
  }

  closeAddCollaboratorModal () {
    this.setState({showAddCollaboratorModal: false})
  }

  onCollaboratorRemove (index) {
    removeCollaborator(this.props.doc, index)
  }

  // TODO: this function requires re-design, this was extracted from children as part of clean up
  // possibly promisify subscriptions callbacks
  onCollaboratorSubmit (username) {
    this.setState({loadingCollaboratorProfile: true})

    // TODO make sure this subscription gets cleaned up, ideally via React lifecycle.
    const subscription = ProfileQuerySubscription({username})
    subscription.init({
      onUpdate: (profile) => {

        const state = {
          loadingCollaboratorProfile: false
        }

        if (profile) {
          state.profileNotFound = false
          state.showAddCollaboratorModal = false
          addCollaborator(this.props.doc, profile.id)
        } else {
          state.profileNotFound = true
        }

        this.setState(state)
        subscription.tearDown()
      },
      onError: () => {
        this.setState({
          loadingCollaboratorProfile: false,
          profileNotFound: true
        })
        subscription.tearDown()
      }
    })
  }
}
