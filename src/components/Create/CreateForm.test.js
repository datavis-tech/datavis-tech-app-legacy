import React from 'react'
import renderer from 'react-test-renderer'
import CreateForm from './CreateForm'

it('renders', () => {
  const tree = renderer.create(<CreateForm/>).toJSON();
  expect(tree).toMatchSnapshot();
})

it('validates against empty title and provides feedback', () => {
  const render = renderer.create(<CreateForm/>)
  const tree = render.toJSON()
  const form = tree.children[1]

  // Simulate submitting the form.
  let defaultPrevented = false
  form.props.onSubmit({
    preventDefault: () => defaultPrevented = true
  })
  expect(defaultPrevented).toBe(true)

  // This snapshot contains the title danger feedback.
  expect(render.toJSON()).toMatchSnapshot()
})

////it('calls createDocument when title is present', (done) => {
////  const div = document.createElement('div')
////  let createDocumentCalled = false
////  ReactDOM.render(<CreateForm createDocument={ ({title}) => {
////    createDocumentCalled = true
////  }}/>, div)
////  const title = div.querySelector('#title')
////  title.value = 'My Title'
////  title.dispatchEvent(new Event('change', {id:'title', value:'foo'}))
////  setTimeout(() =>{
////    console.log("foo")
////    done()
////  }, 1000)
////
////  var evt = document.createEvent("HTMLEvents");
////  evt.initEvent("change", false, true);
////  title.dispatchEvent(evt);
////
////  //div.querySelector('button').dispatchEvent(new Event('click'))
////  //expect(div.querySelectorAll('.title-feedback').length).toBe(0)
////  //expect(createDocumentCalled).toBe(true)
////})
