import React, { useState } from 'react'
import blogServices from '../services/blogs'
import PropTypes from 'prop-types'

const ShowBlog = ({ blog, setMessage, setError, blogs, setBlogs }) => {
  const [blogVisible, setBlogVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  const hideWhenVisible = { display: blogVisible ? 'none' : '' }
  const showWhenVisible = { display: blogVisible ? '' : 'none' }

  const handleLike = async () => {
    const newlikes = likes+1
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: newlikes,
      user: blog.user,
      id: blog.id
    }

    try {
      await blogServices.addLike(updatedBlog)
      setLikes(newlikes)
      setMessage('liked')
      setError(false)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (error) {
      setError(true)
      setMessage(error.response.data.error)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleDelete = async () => {
    const blogToDelete = blog.id

    try {
      await blogServices.deleteBlog(blogToDelete)
      console.log(blogs)
      const newBlogs = blogs.filter((blog) => blog.id !== blogToDelete)
      setBlogs(newBlogs)
      setError(false)
      setMessage('blog deleted')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <div>
        <div style={ hideWhenVisible }>
          <p>{ blog.title } <button onClick={ () => setBlogVisible(true) }>view</button></p>
        </div>
        <div style={showWhenVisible}>
          <h4>{ blog.title } <button onClick={ () => setBlogVisible(false) }>hide</button></h4>
          <p>{ blog.url }</p>
          <p>{ likes } <button onClick={ handleLike }>like</button></p>
          <p>{ blog.author }</p>
          <button onClick={ handleDelete }>delete blog</button>
        </div>
      </div>
    </div>
  )
}

ShowBlog.propTypes = {
  blog: PropTypes.object.isRequired,
  setMessage: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired
}

export default ShowBlog
