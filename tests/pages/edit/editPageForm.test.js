import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import fakeDoc from '../../utils/fakeDoc'
import { serializeDocument } from '../../../src/db/serializers'
import CodeMirrorBinding from '../../../src/components/codeMirrorBinding'
import EditPageForm from '../../../src/pages/edit/editPageForm'

describe('edit page form', () => {

  let sut
  let props
  let __shareDbDoc
  let document
  let onTitleChange
  let onPrivacyChange
  let onDescriptionChange

  beforeEach(() => {

    __shareDbDoc = fakeDoc()
    document = serializeDocument(__shareDbDoc)

    document = jest.fn()
    onTitleChange = jest.fn()
    onPrivacyChange = jest.fn()
    onDescriptionChange = jest.fn()

    props = { document, __shareDbDoc, onTitleChange, onPrivacyChange, onDescriptionChange }

    sut = shallow(<EditPageForm {...props} />)
  })

  it('should render content as code mirror', () => {
    expect(sut.find(CodeMirrorBinding).props()).toMatchObject({
      doc: __shareDbDoc,
      path: ['content']
    })
  })

  // TODO uncomment the following when privacy feature is re-enabled.
  // describe('changes of inputs', () => {
  //   testInput('privacy-public', 'onPrivacyChange', false)
  //   testInput('privacy-private', 'onPrivacyChange', true)
  //   function testInput (name, prop, expectedValue) {
  //     it(`should notify about changes of ${name}`, () => {
  //       value = String(Math.random())
  //       sut.find(nodeSelector(name)).simulate('change', {target: {value}})
  //       expect(props[prop]).toHaveBeenCalledWith(expectedValue === undefined ? value : expectedValue)
  //     })
  //   }
  // })

  describe('layouts', () => {

    it('should not contain slots if they were not provided', () => {
      const tree = renderer.create(<EditPageForm {...props} />).toJSON()
      expect(tree).toMatchSnapshot()
    })

    it('should contain slots if they were provided', () => {

      const propsWithSlots = {
        References: <div>References</div>,
        Preview: <div>Preview</div>,
        ...props
      }

      const tree = renderer.create(<EditPageForm {...propsWithSlots} />).toJSON()
      expect(tree).toMatchSnapshot()
    })

  })

})
