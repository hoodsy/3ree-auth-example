import * as types from '../constants/actionTypes'

// Todos
// =====
export const addTodo = (text, listIndex) => { type: types.ADD_TODO, text, listIndex }
export const completeTodo = (listIndex, index) => { type: types.COMPLETE_TODO, listIndex, index }

// Lists
// =====
export const addList = (text) => { type: types.ADD_LIST, text }