import React from 'react'
import ReactDOM from 'react-dom'
import Create from './index'
import { titleFeedbackText } from './TitleFormGroup'

it('renders a .container', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Create />, div)
  expect(div.querySelectorAll('.container').length).toBe(1)
})

it('renders a #title', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Create />, div)
  expect(div.querySelectorAll('#title').length).toBe(1)
})

it('renders a #title', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Create />, div)
  expect(div.querySelectorAll('#title').length).toBe(1)
})

it('renders a button', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Create />, div)
  expect(div.querySelectorAll('button').length).toBe(1)
})

it('validates against empty title and provides feedback', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Create />, div)
  div.querySelector('button').dispatchEvent(new Event('click'))
  expect(div.querySelectorAll('.title-feedback').length).toBe(1)
  expect(div.querySelector('.title-feedback').textContent).toBe(titleFeedbackText)
})
