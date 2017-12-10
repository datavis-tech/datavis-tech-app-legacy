import DocumentsForUserSubscription from '../../db/subscriptions/documentsForUserSubscription'
import DocumentsForOwnerSubscription from '../../db/subscriptions/documentsForOwnerSubscription'

export default (user, profile) => (
  user.id === profile.id
    ? DocumentsForOwnerSubscription({owner: profile.id})
    : DocumentsForUserSubscription({owner: profile.id, id: user.id})
)
