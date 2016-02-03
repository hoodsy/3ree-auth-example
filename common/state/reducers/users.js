import * as types from '../constants/actionTypes'

// State Shape
// ===========
const initialState = {
  usersById: {},
  currentUser: '',
  isAuthenticated: false,
  isFetching: false
}

// Private Sub-Reducers
// ====================
function usersById(state = {}, action) {
  switch(action.type) {
    case types.LOGIN_USER_SUCCESS:
    case types.REGISTER_USER_SUCCESS:
      const { user } = action
      return {
        [user.id]: user
      }

    default:
      return state
  }
}

function currentUser(state = '', action) {
  switch(action.type) {
    case types.LOGIN_USER_SUCCESS:
    case types.REGISTER_USER_SUCCESS:
      const { user } = action
      return user.id

    default:
      return state
  }
}

// Public Reducer
// ==============
export default function users(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_USER_REQUEST:
    case types.LOGOUT_USER_REQUEST:
    case types.REGISTER_USER_REQUEST:
    case types.ADD_DASHBOARD_TO_USER_REQUEST:
    case types.REMOVE_DASHBOARD_FROM_USER_REQUEST:
      return {
        ...state,
        isFetching: true
      }

    case types.LOGOUT_USER_SUCCESS:
      return {
        ...state,
        currentUser: {
          isAuthenticated: false
        },
        isFetching: false
      }

    case types.LOGIN_USER_SUCCESS:
    case types.REGISTER_USER_SUCCESS:
    case types.ADD_DASHBOARD_TO_USER_SUCCESS:
    case types.REMOVE_DASHBOARD_FROM_USER_SUCCESS:
      return {
        ...state,
        usersById: usersById(state.usersById, action),
        currentUser: currentUser(state.currentUser, action),
        isFetching: false
      }

    case types.LOGIN_USER_FAILURE:
    case types.LOGOUT_USER_FAILURE:
    case types.REGISTER_USER_FAILURE:
    case types.ADD_DASHBOARD_TO_USER_FAILURE:
    case types.REMOVE_DASHBOARD_FROM_USER_FAILURE:
      return {
        ...state,
        isFetching: false
      }

    default:
      return state
  }
}
