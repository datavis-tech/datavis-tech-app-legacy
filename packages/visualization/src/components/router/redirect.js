import { Router } from '../../routes'

export default (route, params = {}) => Router.pushRoute(route, params)
