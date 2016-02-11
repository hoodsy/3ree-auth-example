import React, { PropTypes } from 'react'

export const User = (
  { name,
    email,
    picture,
    logoutUser,
    isCurrentUser }) =>
(
  <div style={ style }>
    <img src={ picture } />
    <h4>{ (name) ? name.displayName : '' }</h4>
    <h4>{ email }</h4>
    { (() => {
      if (isCurrentUser)
        return (
          <button onClick={ logoutUser }>
            Logout
          </button>
        )
    })() }
  </div>
)

const style = {
  padding: '25px'
}

User.propTypes = {
  name: PropTypes.object.isRequired,
  email: PropTypes.string.isRequired,
  picture: PropTypes.string,
  logoutUser: PropTypes.func.isRequired
}
