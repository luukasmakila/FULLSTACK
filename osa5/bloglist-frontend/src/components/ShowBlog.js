import React, {useState} from 'react'
import blogServices from '../services/blogs'

const ShowBlog = ({blog, setMessage, setError, blogs, setBlogs}) => {
  const [blogVisible, setBlogVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  const hideWhenVisible = { display: blogVisible ? 'none' : '' }
  const showWhenVisible = { display: blogVisible ? '' : 'none' }

  const handleLike = async () => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: likes,
      user: blog.user,
      id: blog.id
    }

    try {
      const response = await blogServices.addLike(updatedBlog)
      console.log(likes)
      setLikes(likes+1)
      setMessage('liked')
      setError(false)
    } catch (error) {
      setError(true)
      setMessage(error.response.data.error)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }
  return (
    <div>
      <div>
        <div style={hideWhenVisible}>
          <p>{blog.title} <button onClick={() => setBlogVisible(true)}>view</button></p>
        </div>
        <div style={showWhenVisible}>
          <p>{blog.url}</p>
          <p>{likes} <button onClick={handleLike}>like</button></p>
          <p>{blog.author}</p>
          <button onClick={() => setBlogVisible(false)}>cancel</button>
        </div>
      </div>
    </div>
  )
}

export default ShowBlog
