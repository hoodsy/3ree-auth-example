import * as types from '../constants/actionTypes'

// Global Input
// ============
export function setCurrentInputType(inputTypeId) {
  return {
    type: types.SET_CURRENT_INPUT_TYPE,
    inputTypeId
  }
}
