import * as types from '../constants/actionTypes'

// State Shape
// ===========
const initialState = {
  listsById: {},
  currentList: '',
  isFetching: false
}

// Private Sub-Reducers
// ====================
function listsById(state = {}, action) {
  switch(action.type) {
    case types.CREATE_LIST_SUCCESS:
      const { list } = action
      return {
        ...state,
        [list.id]: list
      }

    default:
      return state
  }
}

function currentList(state = '', action) {
  switch(action.type) {
    case types.CREATE_LIST_SUCCESS:
      const { list } = action
      if (!state) return list.id
      return state

    case types.SET_CURRENT_LIST:
      return action.listId

    default:
      return state
  }
}

// Public Reducer
// ==============
export default function lists(state = initialState, action) {
  switch (action.type) {
    case types.CREATE_LIST_REQUEST:
      return {
        ...state,
        isFetching: true
      }

    case types.CREATE_LIST_SUCCESS:
      return {
        listsById: listsById(state.listsById, action),
        currentList: currentList(state.currentList, action),
        isFetching: false
      }

    case types.CREATE_LIST_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }

    case types.SET_CURRENT_LIST:
      return {
        ...state,
        currentList: currentList(state.currentList, action)
      }

    default:
      return state
  }
}
