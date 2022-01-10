import React from 'react'

const LoginFrom = ({ username, password, setUsername, setPassword, handleLogin }) => {

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
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginFrom
