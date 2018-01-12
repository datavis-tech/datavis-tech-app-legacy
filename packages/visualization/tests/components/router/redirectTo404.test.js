jest.mock('../../../src/components/router/redirect')
import redirect from '../../../src/components/router/redirect'

import sut from '../../../src/components/router/redirectTo404'

describe('redirect to 404', () => {

  it('should redirect to non existing page', () => {
    sut()
    expect(redirect).toHaveBeenCalledWith('/document/does-not-exist')
  })

})
