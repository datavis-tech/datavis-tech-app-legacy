import { shallow } from 'enzyme'
import { Search } from 'semantic-ui-react'

jest.mock('../../../src/db/queries/queryReferencesForCompletion')
import queryReferencesForCompletion from '../../../src/db/queries/queryReferencesForCompletion'

import SearchReference from '../../../src/pages/edit/searchReference'

describe('search reference', () => {

  let sut
  let props
  let setState

  beforeEach(() => {
    props = {
      userId: String(Math.random()),
      onReferenceSelect: jest.fn()
    }

    sut = shallow(<SearchReference {...props} />)
    setState = jest.spyOn(sut.instance(), 'setState')
    setState.mockClear()
  })

  it('should render search', () => {
    expect(sut.find(Search).exists()).toBeTruthy()
  })

  describe('on search chnage', () => {

    let pattern
    let results

    beforeEach(() => {
      results = Symbol('results')
      pattern = String(Math.random())
      queryReferencesForCompletion.mockReturnValue(Promise.resolve(results))
      sut.find(Search).simulate('searchChange', null, { value: pattern })
    })

    it('should start showing loader', () => {
      expect(setState).toHaveBeenCalledWith({
        isLoading: true,
        value: pattern
      })
    })

    it('should query references completions', () => {
      expect(queryReferencesForCompletion).toHaveBeenCalledWith(props.userId, pattern)
    })

    it('should keep retrieved results', () => {
      expect(setState).toHaveBeenLastCalledWith({
        isLoading: false,
        isOpen: true,
        results
      })
    })

  })

  describe('on result select', () => {

    let result

    beforeEach(() => {
      result = {
        title: String(Math.random()),
        id: String(Math.random())
      }
      sut.find(Search).simulate('resultSelect', null, { result })
    })

    it('should set value', () => {
      expect(setState).toHaveBeenCalledWith({
        value: result.id,
        isOpen: false
      })
    })

    it('should notify which reference was selected', () => {
      expect(props.onReferenceSelect).toHaveBeenCalledWith(result.id)
    })

  })

})
