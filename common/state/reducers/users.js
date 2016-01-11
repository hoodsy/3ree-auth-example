import * as types from '../constants/actionTypes'

// State Shape
// ===========
const initialState = {
  isFetching: false,
  isAuthenticated: false
}

// Private Sub-Reducers
// ====================


// Public Reducer
// ==============
export default function users(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_USER_REQUEST:
    case types.LOGOUT_USER_REQUEST:
    case types.REGISTER_USER_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })

    case types.LOGIN_USER_SUCCESS:
    case types.LOGOUT_USER_SUCCESS:
    case types.REGISTER_USER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true
      })

    case types.LOGIN_USER_FAILURE:
    case types.LOGOUT_USER_FAILURE:
    case types.REGISTER_USER_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      })

    default:
      return state
  }
}
