import React from 'react'
import { Button } from 'semantic-ui-react'
import { VIS_DOC_TYPE } from '../../constants'
import ReferencesSubscription from '../../db/subscriptions/documentSubscriptions'
import { serializeDocument } from '../../db/serializers'
import * as actions from '../../db/actions'
import Subscription from '../../components/subscription'
import Runner from '../../components/runner/runner'
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

    this.showDeleteConfirmModal = this.showDeleteConfirmModal.bind(this)
    this.hideDeleteConfirmModal = this.hideDeleteConfirmModal.bind(this)
    this.deleteDocument = this.deleteDocument.bind(this)

    this.removeCollaborator = actions.removeCollaborator.bind(null, props.doc)

    this.updateReference = actions.updateReference.bind(null, props.doc)
    this.removeReference = actions.removeReference.bind(null, props.doc)
    this.addReference = actions.addReference.bind(null, props.doc)
    this.setTitle = actions.setDocumentTitle.bind(null, props.doc)
    this.setDescription = actions.setDocumentDescription.bind(null, props.doc)
  
    this.document = serializeDocument(props.doc)
  }

  componentWillReceiveProps({doc}) {
    this.document = serializeDocument(doc)
  }

  render () {
    return (
      <React.Fragment>
        <Subscription subscription={ReferencesSubscription({ids: this.document.referencesIds})}>
          {
            ({data: referenceDocuments}) => (
              <React.Fragment>
                <EditPageForm
                  document={this.document}
                  __shareDbDoc={this.props.doc}
                  onTitleChange={this.setTitle}
                  onDescriptionChange={this.setDescription}
                  Collaborators={
                    <Collaborators
                      ids={this.document.collaboratorsIds}
                      onCollaboratorAdd={this.showAddCollaboratorModal}
                      onCollaboratorRemove={this.removeCollaborator}
                    />
                  }
                  References={
                    this.document.type === VIS_DOC_TYPE
                      ? (
                        <References
                          references={this.document.references}
                          onReferenceAdd={this.addReference}
                          onReferenceUpdate={this.updateReference}
                          onReferenceRemove={this.removeReference}
                        />
                      )
                      : null
                  }
                  Preview={
                    this.document.type === VIS_DOC_TYPE
                      ? (
                        <Runner
                          content={this.document.content}
                          references={this.document.references}
                          referenceDocuments={(referenceDocuments || []).map(serializeDocument)}
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
          title={this.document.title}
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
