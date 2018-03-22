import React from 'react'
import { Button } from 'semantic-ui-react'
import { VIS_DOC_TYPE } from '../../constants'
import { EARLY_ADOPTER } from '../../server/stripe/plans'
import ReferencesSubscription from '../../db/subscriptions/documentSubscriptions'
import { serializeDocument } from '../../db/serializers'
import * as actions from '../../db/actions'
import Subscription from '../../components/subscription'
import Runner from '../../components/runner/runner'
import FullscreenButton from '../../pages/views/slots/fullscreenButton'
import EditPageForm from './editPageForm'
import Collaborators from './collaborators'
import AddCollaboratorModal from './addCollaboratorModal'
import AddReferenceModal from './addReferenceModal'
import DeleteConfirmModal from './deleteConfirmModal'
import References from './references'
import getProfileByUsername from './getProfileByUsername'

// TODO this component is too big
export default class EditPageContent extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      showDeleteConfirmModal: false,
      deletingDocument: false,
      showAddCollaboratorModal: false,
      showAddRefrenceModal: false,
      loadingCollaboratorProfile: false,
      profileNotFound: false
    }

    this.showAddCollaboratorModal = this.showAddCollaboratorModal.bind(this)
    this.closeAddCollaboratorModal = this.closeAddCollaboratorModal.bind(this)
    this.submitCollaborator = this.submitCollaborator.bind(this)

    this.showAddRefrenceModal = this.showAddRefrenceModal.bind(this)
    this.closeAddReferenceModal = this.closeAddReferenceModal.bind(this)
    this.submitReference = this.submitReference.bind(this)

    this.showDeleteConfirmModal = this.showDeleteConfirmModal.bind(this)
    this.hideDeleteConfirmModal = this.hideDeleteConfirmModal.bind(this)
    this.deleteDocument = this.deleteDocument.bind(this)

    this.removeCollaborator = actions.removeCollaborator.bind(null, props.doc)

    this.removeReference = actions.removeReference.bind(null, props.doc)
    this.addReference = actions.addReference.bind(null, props.doc)

    this.setPrivacy = actions.setDocumentPrivacy.bind(null, props.doc)

    this.document = serializeDocument(props.doc)
  }

  componentWillReceiveProps ({doc}) {
    this.document = serializeDocument(doc)
  }

  render () {
    return (
      <React.Fragment>
        <Subscription
          subscription={ReferencesSubscription({ids: this.document.referencesIds})}
          key={JSON.stringify(this.document.referencesIds)}
        >
          {
            ({data: referenceDocuments}) => (
              <React.Fragment>
                <EditPageForm
                  allowPrivacySwitching={this.canSwitchPrivacy}
                  document={this.document}
                  __shareDbDoc={this.props.doc}
                  onPrivacyChange={this.setPrivacy}
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
                          onReferenceAdd={this.showAddRefrenceModal}
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
                <Button.Group vertical>
                  <Button
                    negative
                    disabled={this.deletingDocument}
                    loading={this.deletingDocument}
                    onClick={this.showDeleteConfirmModal}
                    style={{marginTop: '1em'}}
                    data-test='delete-button'
                  >
                    Delete this document
                  </Button>
                  <FullscreenButton id={this.document.id} style={{marginTop: '1em'}} />
                </Button.Group>
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
        <AddReferenceModal
          userId={this.props.user ? this.props.user.id : null}
          show={this.state.showAddReferenceModal}
          onClose={this.closeAddReferenceModal}
          onReferenceSubmit={this.submitReference}
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
      actions.addCollaborator(this.props.doc, profile.id)

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

  showAddRefrenceModal () {
    this.setState({showAddReferenceModal: true})
  }

  closeAddReferenceModal () {
    this.setState({showAddReferenceModal: false})
  }

  submitReference (...args) {
    this.addReference(...args)
    this.closeAddReferenceModal()
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

  deleteDocument () {
    this.setState({showDeleteConfirmModal: false, deletingDocument: true})
    this.props.onDocumentDelete()
  }

  get canSwitchPrivacy () {
    if (this.props.user) {
      return (this.document.owner === this.props.user.id) && (this.props.user.subscriptionPlan === EARLY_ADOPTER)
    }

    return false
  }
}
