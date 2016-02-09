import React, { PropTypes } from 'react'

export const App = (
  { children }) =>
(
  <div style={ styles }>
    { children }
  </div>
)

const styles = {
  padding: '5% 10%'
}

App.propTypes = {
  children: PropTypes.object
}
