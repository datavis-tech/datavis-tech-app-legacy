import React from 'react'
import { Observer } from 'mobx-react'
import { Button } from 'semantic-ui-react'
import Runner from '../../components/runner/runner'
import FullscreenButton from '../../pages/views/slots/fullscreenButton'
import EditPageForm from './editPageForm'
import Collaborators from './collaborators'
import AddCollaboratorModal from './addCollaboratorModal'
import AddReferenceModal from './addReferenceModal'
import DeleteConfirmModal from './deleteConfirmModal'
import References from './references'
import EditPageStore from './editPageStore'

export default class EditPageContent extends React.Component {
  constructor (props) {
    super(props)

    this.store = EditPageStore({
      user: props.user,
      documentId: props.id,
      documentStore: props.documentStore,
      onDocumentDelete: props.onDocumentDelete
    })
  }

  render () {
    return (
      <Observer>
        {() => (
          <React.Fragment>
            <EditPageForm
              allowPrivacySwitching={this.store.canSwitchPrivacy.get()}
              document={this.store.document}
              onPrivacyChange={this.store.submitPrivacyChange}
              onTitleChange={this.store.submitTitleChange}
              onDescriptionChange={this.store.submitDescriptionChange}
              onContentChange={this.store.submitContentChange}
              Collaborators={this.renderCollaborators()}
              References={this.renderReferences()}
              Preview={this.renderPreview()}
            />
            <Button.Group vertical>
              <Button
                negative
                disabled={this.store.pageState.deletingDocument}
                loading={this.store.pageState.deletingDocument}
                onClick={this.store.showDeleteConfirmModal}
                style={{ marginTop: '1em' }}
                data-test='delete-button'
              >
                                Delete this document
              </Button>
              <FullscreenButton
                id={this.store.document.id}
                style={{ marginTop: '1em' }}
              />
            </Button.Group>
            <AddCollaboratorModal
              show={this.store.pageState.showAddCollaboratorModal}
              loading={this.store.pageState.loadingCollaboratorProfile}
              notFound={this.store.pageState.profileNotFound}
              onClose={this.store.closeAddCollaboratorModal}
              onCollaboratorSubmit={this.store.submitCollaboratorAdd}
            />
            <AddReferenceModal
              userId={this.props.user ? this.props.user.id : null}
              show={this.store.pageState.showAddReferenceModal}
              onClose={this.store.closeAddReferenceModal}
              onReferenceSubmit={this.store.submitReferenceAdd}
            />
            <DeleteConfirmModal
              show={this.store.pageState.showDeleteConfirmModal}
              title={this.store.document.title}
              onClose={this.store.closeDeleteConfirmModal}
              onDelete={this.store.submitDocumentDelete}
            />
          </React.Fragment>
        )}
      </Observer>
    )
  }

  renderCollaborators () {
    return (
      <Collaborators
        ids={this.store.document.collaborators}
        onCollaboratorAdd={this.store.showAddCollaboratorModal}
        onCollaboratorRemove={this.store.submitCollaboratorRemove}
      />
    )
  }

  renderReferences () {
    return this.store.document.isVisualization.get() ? (
      <References
        references={this.store.document.references}
        onReferenceAdd={this.store.showAddRefrenceModal}
        onReferenceRemove={this.store.submitReferenceRemove}
      />
    ) : null
  }

  renderPreview () {
    return this.store.document.isVisualization.get() ? (
      <Runner
        content={this.store.document.content}
        references={this.store.document.references}
        referenceDocuments={this.store.references}
      />
    ) : null
  }
}
