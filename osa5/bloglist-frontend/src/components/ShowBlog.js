import React, { useState } from 'react'
import blogServices from '../services/blogs'

const ShowBlog = ({ blog, setBlogs, blogs }) => {
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
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async () => {
    const blogToDelete = blog.id

    try {
      await blogServices.deleteBlog(blogToDelete)
      console.log(blogs)
      const newBlogs = blogs.filter((blog) => blog.id !== blogToDelete)
      setBlogs(newBlogs)
    } catch (error) {
      console.log(error)
    }
  }

  const handleClick = () => {
    if(blogVisible) {
      setBlogVisible(false)
    } else {
      setBlogVisible(true)
    }
  }

  return (
    <div>
      <div>
        <div style={ hideWhenVisible }>
          <p>{ blog.title } { blog.author }<button onClick={handleClick}>view</button></p>
        </div>
        <div style={showWhenVisible}>
          <h4>{ blog.title } <button onClick={handleClick}>hide</button></h4>
          <p>{ blog.url }</p>
          <p>{ likes } <button onClick={ handleLike }>like</button></p>
          <p>{ blog.author }</p>
          <button onClick={ handleDelete }>delete blog</button>
        </div>
      </div>
    </div>
  )
}

export default ShowBlog
