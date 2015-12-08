import { compose, createStore, applyMiddleware } from 'redux'
import { devTools, persistState } from 'redux-devtools'

export default compose(
  applyMiddleware(),
  devTools(),
  persistState()
)(createStore)