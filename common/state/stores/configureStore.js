import { compose, createStore, applyMiddleware } from 'redux'
import { devTools, persistState } from 'redux-devtools'
import thunk from 'redux-thunk'

export default compose(
  applyMiddleware(thunk),
  devTools(),
  persistState(),
)(createStore)
