import { push } from 'redux-simple-router'

export const authenticationRouter = store => next => action => {
  if (action.err && action.status === 401)
    store.dispatch(push('/login'))
  else next(action)
}
