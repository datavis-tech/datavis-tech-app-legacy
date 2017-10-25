import React from 'react'
import { shallow } from 'enzyme'

import { Grid } from 'semantic-ui-react'
import Head from 'next/head'

import Layout from '../../components/layout'

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

  it('should render the children', () => {
    expect(sut.find('div').contains('I am child')).toBeTruthy()
  })

  it('should render the title', () => {
    expect(sut.find('title').contains('This is title')).toBeTruthy()
  })

  it('should render the Navbar with user prop as undefined', () => {
    expect(sut.find('Navbar').prop('user')).toBeUndefined()
  })

  it('should render feedback Grid.Column', () => {
    expect(sut.find(Grid.Column).html()).toContain('feedback')
  })

  it(`should contains 2 'link' tags in Head`, () => {
    expect(sut.find(Head).find('link')).toHaveLength(2)
  })

  it(`should contains 2 'meta' tags in Head`, () => {
    expect(sut.find(Head).find('meta')).toHaveLength(2)
  })

  describe('if user was provided', () => {
    let user

    beforeEach(() => {
      user = fakeUser()
      sut.setProps({user})
    })

    it('should render the Navbar with user prop', () => {
      expect(sut.find('Navbar').prop('user')).toMatchObject(user)
    })

  })

  describe('if hideNav present', () => {

    beforeEach(() => {
      sut.setProps({hideNav: true})
    })

    it('should not render the Navbar', () => {
      expect(sut.find('Navbar')).toHaveLength(0)
    })

    it('should still render feedback Grid.Column', () => {
      expect(sut.find(Grid.Column).html()).toContain('feedback')
    })

  })

  describe('if hideFeedback present', () => {

    beforeEach(() => {
      sut.setProps({hideFeedback: true})
    })

    it('should not render feedback Grid.Column', () => {
      expect(sut.find(Grid.Column)).toHaveLength(0)
    })

    it('should still render Navbar with user prop as undefined', () => {
      expect(sut.find('Navbar').prop('user')).toBeUndefined()
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
