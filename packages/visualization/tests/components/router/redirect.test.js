jest.mock('../../../src/routes')
import { Router } from '../../../src/routes'

import sut from '../../../src/components/router/redirect'

describe('redirect', () => {

  it('should push passed route and params', () => {

    const route = String(Math.random())
    const params = Symbol('params')

    sut(route, params)

    expect(Router.pushRoute).toHaveBeenCalledWith(route, params)
  })

})
