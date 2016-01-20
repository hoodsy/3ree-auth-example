import { routeActions } from 'redux-simple-router'

export const authenticationRouter = store => next => action => {
  if (action.err && action.status === 401)
    store.dispatch(routeActions.push('/login'))
  else next(action)
}
