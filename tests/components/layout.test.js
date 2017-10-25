import React from 'react'
import { shallow } from 'enzyme'

import { Grid } from 'semantic-ui-react'
import Head from 'next/head'

import Layout from '../../components/layout'
import Spacer from '../../components/spacer'
import Navbar from '../../components/navbar'

import fakeUser from '../utils/fakeUser'
import nodeSelector from '../utils/nodeSelector'

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

  it(`should contains 'link' with 'main-stylesheet'`, () => {
    expect(sut.find(nodeSelector('main-stylesheet')).get(0)).toMatchSnapshot()
  })

  it(`should contains 'link' with 'favicon'`, () => {
    expect(sut.find(nodeSelector('favicon')).get(0)).toMatchSnapshot()
  })

  it(`should contains 'meta' with 'meta-charset'`, () => {
    expect(sut.find(nodeSelector('meta-charset')).get(0)).toMatchSnapshot()
  })

  it(`should contains 'meta' with 'meta-viewport'`, () => {
    expect(sut.find(nodeSelector('meta-viewport')).get(0)).toMatchSnapshot()
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

  it('should render feedback', () => {
    expect(sut.find(Grid.Column).html()).toContain('feedback')
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

  describe('if hideNav present and true', () => {

    beforeEach(() => {
      sut.setProps({hideNav: true})
    })

    it('should not render the Navbar', () => {
      expect(sut.find(Navbar)).toHaveLength(0)
    })

    it('should still render feedback', () => {
      expect(sut.find(Grid.Column).html()).toContain('feedback')
    })

    it('should render the Spacer', () => {
      expect(sut.find(Spacer)).toHaveLength(1)
    })

    describe('if false', () => {

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

  describe('if hideFeedback present and true', () => {

    beforeEach(() => {
      sut.setProps({hideFeedback: true})
    })

    it('should not render feedback', () => {
      expect(sut.find(Grid.Column)).toHaveLength(0)
    })

    it('should still render Navbar with user prop as undefined', () => {
      expect(sut.find(Navbar).prop('user')).toBeUndefined()
    })

    describe('if false', () => {

      beforeEach(() => {
        sut.setProps({hideFeedback: false})
      })

      it('should not render feedback', () => {
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
