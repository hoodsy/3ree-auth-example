import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { loginUser,
         registerUser } from '../../state/actions'

class Login extends Component {
  submitAction(action, e) {
    e.preventDefault()
    const nodeEmail = this.refs.email
    const email = nodeEmail
    const nodePassword = this.refs.password
    const password = nodePassword.value.trim()
    if (email && password) {
      action({ email, password })
      nodeEmail.value = ''
      nodePassword.value = ''
    }
  }

  // handleLogin(e) {
  //   const { loginUser } = this.props
  //   e.preventDefault()
  //   const nodeEmail = this.refs.email
  //   const email = nodeEmail.value.trim()
  //   const nodePassword = this.refs.password
  //   const password = nodePassword.value.trim()
  //   if (email && password) {
  //     loginUser({ email, password })
  //     nodeEmail.value = ''
  //     nodePassword.value = ''
  //   }
  // }

  // handleRegister(e) {
  //   const { registerUser } = this.props
  //   e.preventDefault()
  //   const nodeEmail = this.refs.email
  //   const email = nodeEmail.value.trim()
  //   const nodePassword = this.refs.password
  //   const password = nodePassword.value.trim()
  //   if (email && password) {
  //     registerUser({ email, password })
  //     nodeEmail.value = ''
  //     nodePassword.value = ''
  //   }
  // }

  render() {
    const {
      loginUser,
      registerUser
    } = this.props

    return (
      <div>
        <h1>Login</h1>
        <form>
          <input
            type="text"
            placeholder="Email"
            ref="email" />
          <input
            type="password"
            placeholder="Password"
            ref="password" />
          <button
            onClick={ this.submitAction(loginUser, e) }>
            { `Login` }
          </button>
          <button
            onClick={ this.submitAction(registerUser, e) }>
            { `Register` }
          </button>
        </form>
      </div>
    )
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    users: state.users
  }
}

export default connect(
  mapStateToProps,
  { loginUser,
    registerUser }
)(Login)

