import React from 'react'
import { Button } from 'semantic-ui-react'
import { VIS_DOC_TYPE } from '../../constants'
import Subscription from '../../components/subscription'
import ReferencesSubscription from '../../db/subscriptions/documentSubscriptions'
import { title, type, references, referenceIds, collaboratorIds } from '../../db/accessors'
import {
  removeCollaborator, addCollaborator,
  addReference, removeReference, updateReference
} from '../../db/actions'
import EditPageForm from './components/editPageForm'
import Collaborators from './collaborators'
import AddCollaboratorModal from './addCollaboratorModal'
import DeleteConfirmModal from './deleteConfirmModal'
import References from './references'
import getProfileByUsername from './getProfileByUsername'

export default class EditPageContent extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      showDeleteConfirmModal: false,
      deletingDocument: false,
      showAddCollaboratorModal: false,
      loadingCollaboratorProfile: false,
      profileNotFound: false
    }

    this.showAddCollaboratorModal = this.showAddCollaboratorModal.bind(this)
    this.closeAddCollaboratorModal = this.closeAddCollaboratorModal.bind(this)
    this.submitCollaborator = this.submitCollaborator.bind(this)

    this.removeCollaborator = removeCollaborator.bind(null, props.doc)

    this.updateReference = updateReference.bind(null, props.doc)
    this.removeReference = removeReference.bind(null, props.doc)
    this.addReference = addReference.bind(null, props.doc)

    this.showDeleteConfirmModal = this.showDeleteConfirmModal.bind(this)
    this.hideDeleteConfirmModal = this.hideDeleteConfirmModal.bind(this)
    this.deleteDocument = this.deleteDocument.bind(this)
  }

  render () {
    const {doc} = this.props

    return (
      <React.Fragment>
        <Subscription subscription={ReferencesSubscription({ids: referenceIds(doc)})}>
          {
            ({data: referenceDocs}) => (
              <React.Fragment>
                <EditPageForm
                  doc={doc}
                  referenceDocs={referenceDocs || []}
                  Collaborators={
                    <Collaborators
                      ids={collaboratorIds(doc)}
                      onCollaboratorAdd={this.showAddCollaboratorModal}
                      onCollaboratorRemove={this.removeCollaborator}
                    />
                  }
                  References={
                    type(doc) === VIS_DOC_TYPE
                      ? (
                        <References
                          references={references(doc)}
                          onReferenceAdd={this.addReference}
                          onReferenceUpdate={this.updateReference}
                          onReferenceRemove={this.removeReference}
                        />
                      )
                      : null
                  }
                />
                <Button
                  negative
                  disabled={this.deletingDocument}
                  loading={this.deletingDocument}
                  onClick={this.showDeleteConfirmModal}
                  style={{marginTop:'1em'}}
                >
                  Delete this document
                </Button>
              </React.Fragment>
            )
          }
        </Subscription>
        <AddCollaboratorModal
          show={this.state.showAddCollaboratorModal}
          loading={this.state.loadingCollaboratorProfile}
          notFound={this.state.profileNotFound}
          onClose={this.closeAddCollaboratorModal}
          onCollaboratorSubmit={this.submitCollaborator}
        />
        <DeleteConfirmModal
          show={this.state.showDeleteConfirmModal}
          title={title(doc)}
          onClose={this.hideDeleteConfirmModal}
          onDelete={this.deleteDocument}
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

  async submitCollaborator (username) {

    this.setState({loadingCollaboratorProfile: true})

    try {
      const profile = await getProfileByUsername(username)

      addCollaborator(this.props.doc, profile.id)

      this.setState({
        showAddCollaboratorModal: false,
        loadingCollaboratorProfile: false,
        profileNotFound: false
      })
    } catch (e) {
      this.setState({
        showAddCollaboratorModal: true,
        loadingCollaboratorProfile: false,
        profileNotFound: true
      })
    }

  }

  showDeleteConfirmModal () {
    this.setState({
      showDeleteConfirmModal: true
    })
  }

  hideDeleteConfirmModal () {
    this.setState({
      showDeleteConfirmModal: false
    })
  }

  deleteDocument() {
    this.setState({showDeleteConfirmModal: false, deletingDocument: true})  
    this.props.onDocumentDelete()
  }
}
