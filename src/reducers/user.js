export const FETCH_USER = 'FETCH_USER'
export const REQUEST_USER = 'REQUEST_USER'

const requestUser = () => ({ type: REQUEST_USER })

export const fetchUser = () => (dispatch) => {
  dispatch(requestUser())

  fetch('/api/auth/user', { credentials: 'same-origin' })
    .then((response) => response.json())
    .then((json) => console.log(json))
}

export default (state = {}, action) => {
  switch (action.type) {
    case REQUEST_USER:
      return { isFetching: true }
    default:
      return state
  }
}
