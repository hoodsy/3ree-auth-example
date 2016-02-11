import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { loginUser,
         registerUser } from '../../state/actions'

class Login extends Component {
  submitAction(e) {
    e.preventDefault()
    let email = this.emailInput.value
    let password = this.passwordInput.value
    if (email && password) {
      this.action({
        email: email.trim(),
        password: password.trim()
      })
      email = ''
      password = ''
    }
  }

  render() {
    const {
      loginUser,
      registerUser
    } = this.props

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={ (e) => this.submitAction(e) }>
          <input
            type="text"
            placeholder="Email"
            ref={ (ref) => this.emailInput = ref } />
          <input
            type="password"
            placeholder="Password"
            ref={ (ref) => this.passwordInput = ref } />
          <button
            type="submit"
            onClick={ () => this.action = loginUser }>
            { `Login` }
          </button>
          <button
            type="submit"
            onClick={ () => this.action = registerUser }>
            { `Register` }
          </button>
        </form>
        <a href="/auth/google">Sign in with Google</a>
        <a href="/auth/facebook">Sign in with Facebook</a>
      </div>
    )
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired
}

export default connect(
  () => ({}),
  { loginUser,
    registerUser }
)(Login)
