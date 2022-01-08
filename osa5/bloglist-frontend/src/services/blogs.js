import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async blogInfo => {
  const config = {
    headers: {Authorization: `bearer ${localStorage.getItem('authToken')}`}
  }
  const response = await axios.post(baseUrl, blogInfo, config)
  return response.data
}

const exportedObject = {
  getAll, create
}

export default exportedObject