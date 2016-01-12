import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { loginUser } from '../../state/actions'

class Login extends Component {
  handleSubmit(e) {
    const { loginUser } = this.props
    e.preventDefault()
    const nodeEmail = this.refs.email
    const email = nodeEmail.value.trim()
    const nodePassword = this.refs.password
    const password = nodePassword.value.trim()
    if (email && password) {
      loginUser({ email, password })
      nodeEmail.value = ''
      nodePassword.value = ''
    }
  }

  render() {
    const {
      users
    } = this.props

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input
            type="text"
            placeholder="Email"
            ref="email" />
          <input
            type="password"
            placeholder="Password"
            ref="password" />
          <button>
            { `Login to Anchor` }
          </button>
        </form>
      </div>
    )
  }
}

Login.propTypes = {
  users: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    users: state.users
  }
}

export default connect(
  mapStateToProps,
  { loginUser }
)(Login)

