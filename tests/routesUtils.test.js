jest.mock('../src/routes')
// jest.mock('../src/routes', () => ({
//     findByName: jest.fn(() => ({getAs: jest.fn()}))
// }))

import routes from '../src/routes'
import { getHrefForRoute } from '../src/routesUtils'

describe('route utils', () => {

  const domain = 'https://datavis.tech'

  let getAs
  let path
  let route
  let result
  let params

  beforeEach(() => {
    route = String(Math.random())
    path = String(Math.random())
    getAs = jest.fn(() => path)
    routes.findByName.mockImplementation((r) => ((r === route) || (r === 'vis')) ? {getAs} : undefined)
  })

  describe('not embeded urls', () => {

    beforeEach(() => {
      params = Symbol('params')
      result = getHrefForRoute(route, params)
    })

    it('should try to find route', () => {
      expect(routes.findByName).toHaveBeenCalledWith(route)
    })

    it('should construct path from params', () => {
      expect(getAs).toHaveBeenCalledWith(params)
    })

    it('should return href for known route', () => {
      expect(result).toEqual(`${domain}${path}`)
    })
  })

  describe('embed urls', () => {
    beforeEach(() => {
      params = Symbol('params')
      result = getHrefForRoute('embed', params)
    })

    it('should try to find route', () => {
      expect(routes.findByName).toHaveBeenCalledWith('vis')
    })

    it('should construct path from params', () => {
      expect(getAs).toHaveBeenCalledWith(params)
    })

    it('should return href for known route', () => {
      expect(result).toEqual(`${domain}${path}/embed`)
    })
  })

  describe('export urls', () => {
    beforeEach(() => {
      params = Symbol('params')
      result = getHrefForRoute('export', params)
    })

    it('should try to find route', () => {
      expect(routes.findByName).toHaveBeenCalledWith('vis')
    })

    it('should construct path from params', () => {
      expect(getAs).toHaveBeenCalledWith(params)
    })

    it('should return href for known route', () => {
      expect(result).toEqual(`${domain}${path}/export`)
    })
  })

})
