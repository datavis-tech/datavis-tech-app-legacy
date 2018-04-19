import React from 'react'
import { mount } from 'enzyme'

jest.mock('../../../src/db/serializers')
import { serializeDocument } from '../../../src/db/serializers'

import fakeUser from '../../utils/fakeUser'
import fakeDoc from '../../utils/fakeDoc'
import fakeSubscription from '../../utils/fakeSubscription'
import CallbackTrigger from '../../utils/callbackTrigger'

import { Grid } from 'semantic-ui-react'
import Loader from '../../../src/components/loader'
import ProfileCard from '../../../src/pages/profile/profileCard'

jest.mock('../../../src/components/documentsList', () => () => null)
import DocumentsList from '../../../src/components/documentsList'
import ProfileBody from '../../../src/pages/profile/profileBody'

describe('profile body', () => {

  let sut
  let props
  let profile
  let documents
  let documentsSubscription
  let updateTrigger

  let serialized

  beforeAll(() => {
    process.browser = true

    serialized = String(Math.random())
    serializeDocument.mockReturnValue(serialized)

  })

  afterAll(() => {
    delete process.browser
  })

  beforeEach(() => {
    updateTrigger = new CallbackTrigger()
    profile = fakeUser()
    documents = [fakeDoc(), fakeDoc()]
    documentsSubscription = fakeSubscription(({onUpdate}) => updateTrigger.set(onUpdate, null, documents))

    props = {
      profile: profile.data,
      documentsSubscription
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

      it('should init documentsSubscription', () => {
        expect(documentsSubscription.init).toHaveBeenCalled()
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

          it('should serialize documents', () => {
            expect(serializeDocument).toHaveBeenCalledWith(documents[0], 0, documents)
            expect(serializeDocument).toHaveBeenCalledWith(documents[1], 1, documents)
          })

          it('should have a documents list', () => {
            expect(sut.find(DocumentsList).prop('documents')).toEqual([serialized, serialized])
          })

        })

      })

    })

  })

})
