import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks/index'

const CreateNew = (props) => {
  const navigate = useNavigate()
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')


  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: e.target.content.value,
      author: e.target.author.value,
      info: e.target.info.value,
      votes: 0
    })

    props.setNotification(`new anecdote ${e.target.content.value} was created!`)
    setTimeout(() => {
      props.setNotification('')
    }, 10000)
    navigate('/')
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' type={content.type} value={content.value} onChange={content.onChange} />
        </div>
        <div>
          author
          <input name='author' type={author.type} value={author.value} onChange={author.onChange} />
        </div>
        <div>
          url for more info
          <input name='info' type={info.type} value={info.value} onChange={info.onChange} />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default CreateNew
