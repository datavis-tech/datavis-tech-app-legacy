jest.mock('../../../src/db/subscriptions/documentSubscription')
jest.mock('../../../src/db/subscriptions/profileSubscription')
jest.mock('../../../src/db/subscriptions/documentSubscriptions')

import fakeSubscription from '../../utils/fakeSubscription'
import fakeDoc from '../../utils/fakeDoc'
import fakeProfile from '../../utils/fakeUser'
import CallbackTrigger from '../../utils/callbackTrigger'

import DocumentSubscription from '../../../src/db/subscriptions/documentSubscription'
import ProfileSubscription from '../../../src/db/subscriptions/profileSubscription'
import ReferencesSubscription from '../../../src/db/subscriptions/documentSubscriptions'

import VisSubscription from '../../../src/db/subscriptions/visSubscription'

describe('vis subscription', () => {

  let sut
  let id
  let onUpdate
  let onError

  let mockDocumentSubscription
  let mockDoc
  let docUpdatesTrigger

  let mockProfileSubscription
  let mockProfile
  let profileUpdatesTrigger

  let mockReferencesSubscription
  let mockReferences
  let referencesUpdatesTrigger

  beforeEach(() => {

    const docMocs = createSubscriptionMocks(DocumentSubscription, fakeDoc)
    mockDocumentSubscription = docMocs[0]
    mockDoc = docMocs[1]
    docUpdatesTrigger = docMocs[2]

    const profileMocs = createSubscriptionMocks(ProfileSubscription, fakeProfile)
    mockProfileSubscription = profileMocs[0]
    mockProfile = profileMocs[1]
    profileUpdatesTrigger = profileMocs[2]

    const referencesMocs = createSubscriptionMocks(ReferencesSubscription, fakeDoc)
    mockReferencesSubscription = referencesMocs[0]
    mockReferences = referencesMocs[1]
    referencesUpdatesTrigger = referencesMocs[2]

    id = String(Math.random())
    onUpdate = jest.fn()
    onError = jest.fn()

    sut = VisSubscription()
    sut.init({id}, {onUpdate, onError})
  })

  describe('init', () => {

    it('should not call updates if only doc is available', () => {
      docUpdatesTrigger.trigger()
      expect(onUpdate).not.toHaveBeenCalled()
    })

    it('should not call updates if only doc and profile are available', () => {
      docUpdatesTrigger.trigger()
      profileUpdatesTrigger.trigger()
      expect(onUpdate).not.toHaveBeenCalled()
    })

    it('should call updates if only doc and profile and references are available', () => {
      docUpdatesTrigger.trigger()
      profileUpdatesTrigger.trigger()
      referencesUpdatesTrigger.trigger()
      expect(onUpdate).toHaveBeenCalledWith({
        doc: mockDoc,
        profile: mockProfile,
        references: mockReferences
      })
    })

  })

  describe('tear down', () => {

    beforeEach(() => {
      docUpdatesTrigger.trigger()
      sut.tearDown()
    })

    it('should tear down document subscription', () => {
      expect(mockDocumentSubscription.tearDown).toHaveBeenCalled()
    })

    it('should tear down profile subscription', () => {
      expect(mockProfileSubscription.tearDown).toHaveBeenCalled()
    })

    it('should tear down references subscription', () => {
      expect(mockReferencesSubscription.tearDown).toHaveBeenCalled()
    })

  })

})

function createSubscriptionMocks (SubscriptionCls, mockFactory) {
  const mock = mockFactory()
  const trigger = new CallbackTrigger()

  const mockSubscription = fakeSubscription(
    (params, callbacks) => {
      trigger.set(callbacks.onUpdate, null, mock)
    }
  )
  SubscriptionCls.mockImplementation(() => mockSubscription)

  return [mockSubscription, mock, trigger]
}
