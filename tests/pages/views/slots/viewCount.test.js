import { Statistic } from 'semantic-ui-react'
import { mount } from 'enzyme'

import ViewCount from '../../../../src/pages/views/slots/viewCount'

describe('view count', () => {
  it('should render view count with comma format', () => {
    const sut = mount(<ViewCount viewCount={1234} />)
    expect(sut.find(Statistic.Value).text()).toEqual('1,234')
  })
})
