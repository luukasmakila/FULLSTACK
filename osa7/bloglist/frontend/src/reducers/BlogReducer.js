import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch(action.type){
    case 'INIT_BLOGS':
      return action.data
    case 'ADD':
      const blog = action.data
      console.log(blog)
      return [...state, blog]
    case 'LIKE':
      return [...state]
    case 'DELETE':
      return [...state]
    default:
      return [...state]
  }
}

export const addBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    console.log(newBlog)
    dispatch({
      type: 'ADD',
      data: newBlog
    })
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    const remainingBlogs = await blogService.getAll()
    dispatch({
      type: 'DELETE',
      data: remainingBlogs
    })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    await blogService.update(blog)
    dispatch({
      type: 'LIKE',
      data: blog
    })
  }
}

export const initialBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export default blogReducer