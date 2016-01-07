import * as types from '../constants/actionTypes'

// State Shape
// ===========
const initialState = {
  byId: {
    0: {
      inputType: 'search'
    },
    1: {
      inputType: 'list'
    },
    2: {
      inputType: 'resource'
    },
    3: {
      inputType: 'dashboard'
    }
  },
  current: '0'
}

// Public Reducer
// ==============
export default function globalInput(state = initialState, action) {
  switch (action.type) {
    case types.SET_CURRENT_INPUT_TYPE:
      return Object.assign({}, state, {
        current: action.inputTypeId
      })

    default:
      return state
  }
}
