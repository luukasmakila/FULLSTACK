import React, { useState } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import loginService from './services/login'
import './Index.css'

const App = () => {
  const [user, setUser] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)

  const handleLogout = () => {
    localStorage.clear()
    setUser(null)
  }

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
      setMessage('Logged in!')
      setError(false)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (error) {
      setMessage(error.response.data.error)
      setError(true)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => {
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

  return (
    <div>
      <Notification message={message} error={error}/>
      {localStorage.getItem('authToken') === null ?
        <div>
          <h2>log in to application</h2>
          {loginForm()}
        </div> :
        <div>
          <h2>blogs</h2>
          <p>logged in as {localStorage.getItem('username')} <button onClick={handleLogout}>logout</button></p>
          <Blog setError={setError} setMessage={setMessage}/>
        </div>
      }
    </div>
  )
}

export default App