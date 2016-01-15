import { pushPath } from 'redux-simple-router'

export const authenticationRouter = store => next => action => {
  if (action.err && action.status === 401) {
    console.error('401: User is unauthorized.')
    store.dispatch(pushPath('/login'))
  }
  next(action)
}
