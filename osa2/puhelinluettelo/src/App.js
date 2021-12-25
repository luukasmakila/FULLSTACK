import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")
  const [showAll, setShowAll] = useState(true)

  const hook = () => {
    axios
    .get("http://localhost:3001/persons")
    .then(response => {
      setPersons(response.data)
    })
  }
  useEffect(hook, [])

  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLocaleLowerCase().startsWith(filter.toLocaleLowerCase()) === true)

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    const exists = persons.map(person => person.name)
    if (exists.indexOf(newName) !== -1) {
      alert(newName + " is already added to the phonebook")
    }
    else {
      setPersons(persons.concat(nameObject))
      setNewName("")
      setNewNumber("")
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    setShowAll(false)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter changeFilter={handleFilterChange}/>
      <h3>add a new</h3>
      <PersonForm 
      addName={addName} 
      newName={newName} 
      newNumber={newNumber} 
      nameChange={handleNameChange} 
      numberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow}/>
    </div>
  )
}

export default App
