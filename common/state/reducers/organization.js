import * as types from '../constants/actionTypes'

// State Shape
// ===========
const initialState = {
  id: '',
  title: '',
  users: [],
  dashboards: [],
  isFetching: false
}

// Private Sub-Reducers
// ====================

// Public Reducer
// ==============
export default function organizations(state = initialState, action) {
  switch (action.type) {
    case types.CREATE_ORGANIZATION_REQUEST:
    case types.ADD_USER_TO_ORGANIZATION_REQUEST:
    case types.REMOVE_USER_FROM_ORGANIZATION_REQUEST:
      return {
        ...state,
        isFetching: true
      }

    case types.UPDATE_ORGANIZATION:
    case types.CREATE_ORGANIZATION_SUCCESS:
    case types.ADD_USER_TO_ORGANIZATION_SUCCESS:
    case types.REMOVE_USER_FROM_ORGANIZATION_SUCCESS:
      return {
        ...action.organization,
        isFetching: false
      }

    case types.CREATE_ORGANIZATION_FAILURE:
    case types.ADD_USER_TO_ORGANIZATION_FAILURE:
    case types.REMOVE_USER_FROM_ORGANIZATION_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }

    default:
      return state
  }
}
