import React, { PropTypes } from 'react'

export const App = (
  { children }) =>
(
  <div>
    { children }
  </div>
)

App.propTypes = {
  children: PropTypes.object
}
