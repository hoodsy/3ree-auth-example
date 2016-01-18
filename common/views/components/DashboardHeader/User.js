import React, { PropTypes } from 'react'

export const User = (
  { name,
    email,
    picture }) =>
(
  <div>
    <img src={ picture } />
    <h4>{ (name) ? name.displayName : '' }</h4>
    <h4>{ email }</h4>
  </div>
)

User.propTypes = {
  name: PropTypes.object.isRequired,
  email: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired
}
