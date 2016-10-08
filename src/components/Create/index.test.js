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
  let createDocumentCalled = false
  ReactDOM.render(<Create createDocument={ () => {
    createDocumentCalled = true
  }}/>, div)
  div.querySelector('button').dispatchEvent(new Event('click'))
  expect(div.querySelectorAll('.title-feedback').length).toBe(1)
  expect(div.querySelector('.title-feedback').textContent).toBe(titleFeedbackText)
  expect(createDocumentCalled).toBe(false)
})

//it('calls createDocument when title is present', (done) => {
//  const div = document.createElement('div')
//  let createDocumentCalled = false
//  ReactDOM.render(<Create createDocument={ ({title}) => {
//    createDocumentCalled = true
//  }}/>, div)
//  const title = div.querySelector('#title')
//  title.value = 'My Title'
//  title.dispatchEvent(new Event('change', {id:'title', value:'foo'}))
//  setTimeout(() =>{
//    console.log("foo")
//    done()
//  }, 1000)
//
//  var evt = document.createEvent("HTMLEvents");
//  evt.initEvent("change", false, true);
//  title.dispatchEvent(evt);
//
//  //div.querySelector('button').dispatchEvent(new Event('click'))
//  //expect(div.querySelectorAll('.title-feedback').length).toBe(0)
//  //expect(createDocumentCalled).toBe(true)
//})
