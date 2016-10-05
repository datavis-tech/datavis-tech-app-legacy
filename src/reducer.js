import { SHOW_MODAL, HIDE_MODAL } from './actionCreators'

const reducer = (state = false, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return true
    case HIDE_MODAL:
      return false
    default:
      return state
  }
}
export default reducer
