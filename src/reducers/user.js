export const FETCH_USER = 'FETCH_USER'
export const REQUEST_USER = 'REQUEST_USER'

const requestUser = () => ({ type: REQUEST_USER })

export const fetchUser = () => (dispatch) => {
  dispatch(requestUser())

  // TODO use fetch here to invoke /api/auth/user
}

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_USER:
      console.log('should fetch user')
      return { isFetching: true }
    default:
      return state
  }
}
