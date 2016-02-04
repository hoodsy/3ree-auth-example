import React, { PropTypes } from 'react'

export const User = (
  { name,
    email,
    picture,
    logoutUser,
    isCurrentUser }) =>
(
  <div>
    <img src={ picture } />
    <h4>{ (name) ? name.displayName : '' }</h4>
    <h4>{ email }</h4>
    { (isCurrentUser)
        ?
        <h4
          onClick={ logoutUser }>
          Logout
        </h4>
        :
        ''
    }
  </div>
)

User.propTypes = {
  // id: PropTypes.string.isRequired,
  // name: PropTypes.object.isRequired,
  // email: PropTypes.string.isRequired,
  // picture: PropTypes.string.isRequired,
  logoutUser: PropTypes.func.isRequired
}
