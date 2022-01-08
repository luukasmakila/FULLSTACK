import React, { useState } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'

const App = () => {
  const [user, setUser] = useState('')
  const handleLogout = () => {
    localStorage.clear()
    setUser(null)
  }

  return (
    <div>
      {localStorage.getItem('authToken') === null ?
        <div>
          <h2>log in to application</h2>
          <Login setUser={setUser}/>
        </div> :
        <div>
          <h2>blogs</h2>
          <p>logged in as {localStorage.getItem('username')} <button onClick={handleLogout}>logout</button></p>
          <Blog/>
        </div>
      }
    </div>
  )
}

export default App