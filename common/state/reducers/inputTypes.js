import * as types from '../constants/actionTypes'

// State Shape
// ===========
const initialState = {
  inputTypesById: {
    0: {
      id: '0',
      title: 'search'
    },
    1: {
      id: '1',
      title: 'list'
    },
    2: {
      id: '2',
      title: 'resource'
    },
    3: {
      id: '3',
      title: 'dashboard'
    }
  },
  currentInputType: '0'
}

// Public Reducer
// ==============
export default function inputTypes(state = initialState, action) {
  switch (action.type) {
    case types.SET_CURRENT_INPUT_TYPE:
      return {
        ...state,
        currentInputType: action.inputTypeId
      }

    default:
      return state
  }
}
