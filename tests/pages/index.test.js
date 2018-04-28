jest.mock('isomorphic-fetch')
jest.mock('../../src/components/page', () => Component => Component)
import Home from '../../src/pages/index'

describe('home page', () => {
  beforeAll(() => {
    global.fetch = jest.fn()
  })

  afterAll(() => {
    delete global.fetch
  })

  describe('get initial props', () => {
    let props
    let response
    let recentDocuments

    beforeEach(async () => {
      recentDocuments = Symbol('recentDocuments')
      response = {
        json: jest
          .fn()
          .mockReturnValue(Promise.resolve(recentDocuments))
      }
      global.fetch.mockReturnValue(Promise.resolve(response))
      props = await Home.getInitialProps({ req: 'request' })
    })

    it('should make requests for recent documents', () => {
      expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/rest/documents/recent')
    })

    it('should convert response to json', () => {
      expect(response.json).toHaveBeenCalled()
    })

    it('should provide received recent docs as props', () => {
      expect(props).toMatchObject({
        recentDocuments
      })
    })
  })
})
