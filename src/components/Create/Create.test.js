import React from 'react'
import ReactDOM from 'react-dom'
import Create from './index'

it('renders a .container', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Create />, div)
  expect(div.querySelectorAll('.container').length).toBe(1)
})

