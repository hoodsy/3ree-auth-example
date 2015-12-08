import * as types from '../constants/actionTypes'

// Todos
// =====
export const addTodo = (text, listIndex) => { type: types.ADD_TODO, text, listIndex }
export const completeTodo = (listIndex, index) => return { type: types.COMPLETE_TODO, listIndex, index }

// Lists
// =====
export const addList = (text) => return { type: types.ADD_LIST, text }