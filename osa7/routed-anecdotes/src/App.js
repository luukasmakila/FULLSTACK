import React, { useState } from 'react'
import About from './components/About'
import AnecdoteList from './components/AnecdoteList'
import Menu from './components/Menu'
import CreateNew from './components/CreateNew'
import Footer from './components/Footer'
import Notification from './components/Notification'
import Anecdote from './components/Anecdote'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])
  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    console.log(anecdote)
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu/>
      <Notification notification={notification}/>
      <Router>
        <Routes>
          <Route path='/' element={<AnecdoteList anecdotes={anecdotes}/>}/>
          <Route path='/create' element={<CreateNew addNew={addNew} setNotification={setNotification}/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/anecdotes/:id' element={<Anecdote anecdotes={anecdotes}/>}/>
        </Routes>
      </Router>
      <Footer/>
    </div>
  )
}

export default App;