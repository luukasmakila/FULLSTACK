import axios from 'axios'

const baseURL = '/api/users'

export const getAllUsers = async () => {
  const request = await axios.get(baseURL)
  return request.data
}