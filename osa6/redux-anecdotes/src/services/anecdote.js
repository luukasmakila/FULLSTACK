import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const addVote = async (anecdote) => {
  const url = `${baseUrl}/${anecdote.id}`
  console.log(url)
  //console.log(anecdote)
  const response = await axios.put(url, anecdote)
}

const addNew = async (anecdote) => {
  const response = await axios.post(baseUrl, anecdote)
  return anecdote
}

export default { getAll, addNew, addVote }