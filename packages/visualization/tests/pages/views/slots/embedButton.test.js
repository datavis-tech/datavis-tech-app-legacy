jest.mock('../../../../src/routes', () => ({
  findByName: () => ({
    getAs: ({id}) => `some/vis/path/with/${id}`
  })
}))

import React from 'react'
import renderer from 'react-test-renderer'
import EmbedButton from '../../../../src/pages/views/slots/embedButton'

describe('embed button', () => {

  const id = 'Some id'

  let tree

  it('should be a button with a popup', () => {
    tree = renderer.create(<EmbedButton id={id} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

})
