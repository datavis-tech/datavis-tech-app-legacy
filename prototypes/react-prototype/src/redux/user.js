export const FETCH_USER = 'FETCH_USER'
export const REQUEST_USER = 'REQUEST_USER'
export const RECEIVE_USER = 'RECEIVE_USER'

const requestUser = () => ({ type: REQUEST_USER })
const receiveUser = (json) => ({ type: RECEIVE_USER, json })

export const fetchUser = () => (dispatch) => {
  dispatch(requestUser())
  return fetch('/api/auth/user', { credentials: 'same-origin' })
    .then((response) => response.json())
    .then((json) => dispatch(receiveUser(json)))
}

export default (state = {}, action) => {
  switch (action.type) {

    case REQUEST_USER:
      return { isFetching: true }

    case RECEIVE_USER:
      return Object.assign({
        isFetching: false,
        isLoggedIn: action.json !== null
      }, action.json)

    default:
      return state
  }
}
