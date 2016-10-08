import React from 'react'
import {shallow} from 'enzyme';
import App from './App'

it('renders a .container-fluid', () => {
  const wrapper = shallow(<App/>)
  expect(wrapper.find('.container-fluid').length).toBe(1)
})
