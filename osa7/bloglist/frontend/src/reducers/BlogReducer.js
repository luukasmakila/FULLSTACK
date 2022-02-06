import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch(action.type){
    case 'INIT_BLOGS':
      return action.data
    case 'ADD':
      const blog = action.data
      return [...state, blog]
    case 'LIKE':
      const updatedBlog = action.data
      const blogIdx = state.findIndex(b => b.id === updatedBlog.id)
      state[blogIdx] = updatedBlog
      return [...state]
    case 'DELETE':
      return action.data
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
    const updatedBlog = await blogService.update(blog)
    dispatch({
      type: 'LIKE',
      data: updatedBlog
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