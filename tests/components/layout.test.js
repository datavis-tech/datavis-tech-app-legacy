import React from 'react'
import { shallow } from 'enzyme'

import { Grid } from 'semantic-ui-react'
import Head from 'next/head'

import Layout from '../../src/components/layout'
import Spacer from '../../src/components/spacer'
import Navbar from '../../src/components/navbar'

import fakeUser from '../utils/fakeUser'

describe('Layout', () => {
  let sut
  let props

  beforeEach(() => {
    props = {
      title: 'This is title'
    }
    sut = shallow(<Layout {...props} ><div>I am child</div></Layout>)
  })

  it('should render the title', () => {
    expect(sut.find('title').contains('This is title')).toBeTruthy()
  })

  it(`should match Head snapshot`, () => {
    expect(sut.find(Head).get(0)).toMatchSnapshot()
  })

  it('should render the Navbar', () => {
    expect(sut.find(Navbar)).toHaveLength(1)
  })

  it('should not render the Spacer', () => {
    expect(sut.find(Spacer)).toHaveLength(0)
  })

  it('should render the children', () => {
    expect(sut.find('div').contains('I am child')).toBeTruthy()
  })

  it('should render community link', () => {
    expect(sut.find(Grid.Column).html()).toContain('Community')
  })

  describe('if user was provided', () => {
    let user

    beforeEach(() => {
      user = fakeUser()
      sut.setProps({user})
    })

    it('should render the Navbar with user prop', () => {
      expect(sut.find(Navbar).prop('user')).toMatchObject(user)
    })

  })

  describe('hide navbar', () => {

    describe('when it is set', () => {
      beforeEach(() => {
        sut.setProps({hideNav: true})
      })

      it('should not render the Navbar', () => {
        expect(sut.find(Navbar)).toHaveLength(0)
      })

      it('should still render community link', () => {
        expect(sut.find(Grid.Column).html()).toContain('Community')
      })

      it('should render the Spacer', () => {
        expect(sut.find(Spacer)).toHaveLength(1)
      })
    })

    describe('when it is not set', () => {

      beforeEach(() => {
        sut.setProps({hideNav: false})
      })

      it('should render the Navbar', () => {
        expect(sut.find(Navbar)).toHaveLength(1)
      })

      it('should not render the Spacer', () => {
        expect(sut.find(Spacer)).toHaveLength(0)
      })

    })

  })

  describe('hide Feedback', () => {
    describe('when it is set', () => {
      beforeEach(() => {
        sut.setProps({hideFeedback: true})
      })

      it('should not render community link', () => {
        expect(sut.find(Grid.Column)).toHaveLength(0)
      })

      it('should still render Navbar with user prop as undefined', () => {
        expect(sut.find(Navbar).prop('user')).toBeUndefined()
      })
    })

    describe('when it is not set', () => {

      beforeEach(() => {
        sut.setProps({hideFeedback: false})
      })

      it('should render community link', () => {
        expect(sut.find(Grid.Column)).toHaveLength(1)
      })

    })

  })

  describe('if includeCSS present', () => {
    let style = '/style.css'
    beforeEach(() => {
      sut.setProps({includeCSS: style})
    })

    it(`should render the link inside Head with '${style}'`, () => {
      expect(sut.find(Head).find(`link[href='${style}']`)).toHaveLength(1)
    })

  })

})
