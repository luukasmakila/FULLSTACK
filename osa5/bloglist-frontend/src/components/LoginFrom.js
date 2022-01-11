import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ username, password, setUsername, setPassword, handleLogin }) => {

  return (
    <div>
      <form onSubmit={handleLogin}>
        <label htmlFor='username'>username</label>
        <input
          type='text'
          id='username'
          name='username'
          value={username}
          placeholder='enter username'
          onChange={({ target }) => setUsername(target.value)}
        />
        <br/>
        <label htmlFor='password'>password</label>
        <input
          type='password'
          id='password'
          name='password'
          value={password}
          placeholder='enter password'
          onChange={({ target }) => setPassword(target.value)}
        />
        <br/>
        <button id='login-button' type='submit'>login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired
}

export default LoginForm
