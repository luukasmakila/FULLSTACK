import React, {useState, useEffect} from 'react'
import blogServices from '../services/blogs'

const Blog = ({setError, setMessage}) => {
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    const fetchData = () => {
      blogServices.getAll().then(blogs =>
        setBlogs( blogs )
      )
    }
    fetchData()  
  }, [])

  const handleNewBlog = async (e) => {
    e.preventDefault()

    try {
      const blog = await blogServices.create({
        title, author, url
      })
      console.log(blog)
      setBlogs(blogs.concat(blog))
      setTitle('')
      setAuthor('')
      setUrl('')
      setError(false)
      setMessage('Blog added!')
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

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleNewBlog}>
        <label htmlFor='title'>title: </label>
        <input 
          type='text' 
          id='title' 
          name='title' 
          value={title} 
          placeholder='enter title' 
          onChange={({target}) => setTitle(target.value)}
        />
        <br/>
        <label htmlFor='author'>author: </label>
        <input 
          type='text' 
          id='author' 
          name='author' 
          value={author} 
          placeholder='enter author' 
          onChange={({target}) => setAuthor(target.value)}
        />
        <br/>
        <label htmlFor='url'>url: </label>
        <input 
          type='text' 
          id='url' 
          name='url' 
          value={url} 
          placeholder='enter url' 
          onChange={({target}) => setUrl(target.value)}
        />
        <br/>
        <button type='submit'>create</button>
      </form>
      {blogs.map(blog => 
          <p key={blog.title}>{blog.title}</p>
        )}
    </div>  
  )
}

export default Blog