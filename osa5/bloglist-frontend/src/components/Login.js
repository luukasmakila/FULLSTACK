import React, {useState} from 'react'
import loginService from '../services/login'

const Login = ({setUser}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password
      })
      console.log(user)
      setUser(user)
      window.localStorage.setItem('authToken', user.token)
      window.localStorage.setItem('username', user.username)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.log(error)
    }
  }

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
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default Login
