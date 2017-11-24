import React from 'react'
import {mount} from 'enzyme'

jest.mock('../../../src/db/subscriptions/documentsForOwnerSubscription')
import DocumentsForOwnerSubscription from '../../../src/db/subscriptions/documentsForOwnerSubscription'

import fakeUser from '../../utils/fakeUser'
import fakeDoc from '../../utils/fakeDoc'
import fakeSubscription from '../../utils/fakeSubscription'
import CallbackTrigger from '../../utils/callbackTrigger'
import nodeSelector from '../../utils/nodeSelector'

import { Grid } from 'semantic-ui-react'
import Loader from '../../../src/components/loader'
import ProfileCard from '../../../src/pages/profile/profileCard'
import DocumentsList from '../../../src/pages/profile/documentsList'
import ProfileBody from '../../../src/pages/profile/profileBody'

describe('profile body', () => {

  let sut
  let props
  let profile
  let documents
  let subscription
  let updateTrigger

  beforeAll(() => {
    process.browser = true
  })

  afterAll(() => {
    delete process.browser
  })

  beforeEach(() => {
    updateTrigger = new CallbackTrigger()
    profile = fakeUser()
    documents = [fakeDoc(), fakeDoc()]
    subscription = fakeSubscription(({onUpdate}) => updateTrigger.set(onUpdate, null, documents))
    DocumentsForOwnerSubscription.mockImplementation(() => subscription)

    props = {
      profile: profile.data
    }

    sut = mount(<ProfileBody {...props} />)
  })

  describe('profile exists', () => {
    it('should have a grid', () => {
      expect(sut.find(Grid).exists()).toBeTruthy()
    })

    it('should have a profile card', () => {
      expect(sut.find(ProfileCard).prop('profile')).toBe(profile.data)
    })

    describe('documents list', () => {

      it('should subscribe on owner\'s documents', () => {
        expect(DocumentsForOwnerSubscription).toHaveBeenCalledWith({owner: profile.id})
      })

      it('should init subscription', () => {
        expect(subscription.init).toHaveBeenCalled()
      })

      describe('after init', () => {

        it('should have a loader', () => {
          expect(sut.find(Loader).prop('ready')).toBeFalsy()
        })

        it('should not have a documents list', () => {
          expect(sut.find(DocumentsList).exists()).toBeFalsy()
        })

        describe('on update', () => {

          beforeEach(() => {
            updateTrigger.trigger()
            sut.update()
          })

          it('should not have a loader', () => {
            expect(sut.find(Loader).prop('ready')).toBeTruthy()
          })

          it('should have a documents list', () => {
            expect(sut.find(DocumentsList).prop('documents')).toEqual(documents)
          })

        })

      })

    })

  })

  describe('profile does not exist', () => {

    beforeEach(() => {
      sut.setProps({profile: undefined})
    })

    it('should not have grid', () => {
      expect(sut.find(Grid).exists()).toBeFalsy()
    })

    it('should have \'not found\' message', () => {
      expect(sut.find(nodeSelector('notFound')).text()).toEqual('User not found')
    })

  })

})
