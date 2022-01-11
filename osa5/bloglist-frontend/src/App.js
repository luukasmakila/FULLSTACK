import React, { useState, useEffect } from 'react'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LoginFrom from './components/LoginFrom'
import loginService from './services/login'
import blogServices from './services/blogs'
import './Index.css'
import Togglable from './components/Togglable'
import ShowBlog from './components/ShowBlog'

const App = () => {
  const [user, setUser] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)

  const handleLogout = () => {
    localStorage.clear()
    console.log(user)
    setUser(null)
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })
      setUser(user)
      window.localStorage.setItem('authToken', user.token)
      console.log(localStorage.getItem('authToken'))
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

  useEffect(() => {
    const fetchData = () => {
      blogServices.getAll().then(blogs =>
        setBlogs( blogs )
      )
    }
    fetchData()
  }, [])

  blogs.sort((a,b) => (a.likes < b.likes) ? 1 : -1)

  const loginForm = () => {
    return (
      <div>
        <Togglable buttonLabel='login'>
          <LoginFrom
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            handleLogin={handleLogin}
          />
        </Togglable>
      </div>
    )
  }

  const blogForm = () => {

    return (
      <div>
        <Togglable buttonLabel='Blog Form'>
          <BlogForm
            setError={setError}
            setMessage={setMessage}
            blogs={blogs}
            setBlogs={setBlogs}
            title={title}
            setTitle={setTitle}
            author={author}
            setAuthor={setAuthor}
            url={url}
            setUrl={setUrl}
          />
        </Togglable>
        {blogs.map(blog =>
          <div key={blog.title}>
            <ShowBlog blog={blog} setMessage={setMessage} setError={setError} blogs={blogs} setBlogs={setBlogs}/>
          </div>
        )}
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
          {blogForm()}
        </div>
      }
    </div>
  )
}

export default App