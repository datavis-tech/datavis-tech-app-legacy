import React from 'react'
import { VIS_DOC_TYPE } from '../../constants'
import Subscription from '../../components/subscription'
import ReferencesSubscription from '../../db/subscriptions/documentSubscriptions'
import { type, references, referenceIds, collaboratorIds } from '../../db/accessors'
import {
  removeCollaborator, addCollaborator,
  addReference, removeReference, updateReference
} from '../../db/actions'
import EditPageForm from './components/editPageForm'
import Collaborators from './collaborators'
import AddCollaboratorModal from './addCollaboratorModal'
import getProfileByUsername from './getProfileByUsername'
import References from './references'

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
    this.submitCollaborator = this.submitCollaborator.bind(this)

    this.removeCollaborator = removeCollaborator.bind(null, props.doc)

    this.updateReference = updateReference.bind(null, props.doc)
    this.removeReference = removeReference.bind(null, props.doc)
    this.addReference = addReference.bind(null, props.doc)
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
}
