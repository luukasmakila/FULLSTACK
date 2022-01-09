import axios from 'axios'
const baseUrl = '/api/blogs'

const config = {
  headers: {Authorization: `bearer ${localStorage.getItem('authToken')}`}
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async blogInfo => {
  const response = await axios.post(baseUrl, blogInfo, config)
  return response.data
}

const addLike = async blogInfo => {
  const id = blogInfo.user
  const url = `${baseUrl}/${id}`
  const response = await axios.put(url, blogInfo, config)
  return response.data
}

const exportedObject = {
  getAll, create, addLike
}

export default exportedObject