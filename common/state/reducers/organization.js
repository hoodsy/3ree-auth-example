import _ from 'lodash'

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
export default function dashboards(state = initialState, action) {
  switch (action.type) {
    case types.CREATE_ORGANIZATION_REQUEST:
      return {
        ...state,
        isFetching: true
      }

    case types.CREATE_ORGANIZATION_SUCCESS:
      return {
        ...action.organization,
        isFetching: false
      }

    case types.CREATE_ORGANIZATION_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }

    default:
      return state
  }
}
