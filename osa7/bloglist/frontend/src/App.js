import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import User from './components/User'

import loginService from './services/login'
import storage from './utils/storage'

import { setNotification } from './reducers/NotificationReducer'
import { connect, useSelector } from 'react-redux'

import { addBlog, deleteBlog, initialBlogs, likeBlog } from './reducers/BlogReducer'
import { setUser, getUser, removeUser } from './reducers/UserReducer'
import { getAllUsers } from './services/users'

const App = (props) => {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [users, setUsers] = useState([])

  const blogFormRef = React.createRef()

  console.log(blogs)

  useEffect(() => {
    props.initialBlogs()
  }, [])

  useEffect(() => {
    props.getUser()
  }, [])

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getAllUsers()
      setUsers(users)
    }
    fetchUsers()
  }, [])

  const notifyWith = (message, type='success') => {
    props.setNotification(message, type, 5)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      setUsername('')
      setPassword('')
      props.setUser(user)
      notifyWith(`${user.name} welcome back!`)
    } catch(exception) {
      notifyWith('wrong username/password', 'error')
    }
  }

  const createBlog = async (blog) => {
    try {
      blogFormRef.current.toggleVisibility()
      props.addBlog(blog)
      notifyWith(`a new blog '${blog.title}' by ${blog.author} added!`)
    } catch(exception) {
      console.log(exception)
    }
  }

  const handleLike = async (id) => {
    const blogToLike = blogs.find(b => b.id === id)
    const likedBlog = { ...blogToLike, likes: blogToLike.likes + 1, user: blogToLike.user.id }
    props.likeBlog(likedBlog)
    notifyWith(`Liked ${likedBlog.title}`)
  }

  const handleRemove = async (id) => {
    const blogToRemove = blogs.find(b => b.id === id)
    const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
    if (ok) {
      props.deleteBlog(id)
      notifyWith('Blog deleted successfully!')
    }
  }

  const handleLogout = () => {
    props.removeUser()
  }

  if ( !user ) {
    return (
      <div>
        <h2>login to application</h2>
        <Notification/>

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id='username'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id='login'>login</button>
        </form>
      </div>
    )
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
      <h2>blogs</h2>
      <Notification/>

      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>

      <Togglable buttonLabel='create new blog'  ref={blogFormRef}>
        <NewBlog createBlog={createBlog}/>
      </Togglable>

      <h2>Users</h2>
      <p>User's name / number of blogs created</p>
      {users.map(user => 
        <User
          key={user.id}
          user={user}
          blogs={blogs.filter(blog => blog.user.id === user.id || blog.user === user.id)}
        />
      )}

      {blogs.sort(byLikes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          handleRemove={handleRemove}
          own={user.username===blog.user.username}
        />
      )}
    </div>
  )
}

const mapDispatchToProps = {
  addBlog,
  likeBlog,
  deleteBlog,
  initialBlogs,
  setNotification,
  setUser,
  getUser,
  removeUser
}

const ConnectedApp = connect(null, mapDispatchToProps)(App)
export default ConnectedApp